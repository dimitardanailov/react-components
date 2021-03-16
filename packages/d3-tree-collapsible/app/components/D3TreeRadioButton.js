import createTreeMultiSelectorStateMachine from './machines/TreeMultiSelectorStateMachine'

import { useMachine } from '@xstate/react'

import createTreeNodeSwitcher from './machines/TreeNodeSwitcher'

import SelectorListItem from './SelectorListItem'

import {
  ElementWrapper,
  SVGContainer,
  ParentContainer,
  StyledNodeContainer,
} from './styled-components/sharable'
import React from 'react'

// ============ D3TreeRadioButton ====================
function D3TreeRadioButton({
  dbNodes,
  dbSelectedEntity,
  dbSelectedEntities,
  debug,
  updateDatabaseMetaData,
  updateParentChildRelationship,
}) {
  // ============ State machines ====================
  const [stateSwitcher, sendSwitcher, serviceSwitcher] = useMachine(
    createTreeNodeSwitcher(),
  )

  const machine = createTreeMultiSelectorStateMachine({
    dbSelectedEntities: [],
  })
  const [
    stateMultiSelector,
    sendMultiSelector,
    serviceMultiSelector,
  ] = useMachine(machine)

  // ============ referiencies ====================
  const childRef = React.useRef()

  // Callbacks
  const stateSwitcherCallback = async node => {
    const _treeData = await updateParentChildRelationship(node._id)
    setTreeData(_treeData)
    sendSwitcher('MAIN_NODE_IS_SELECTED', { id: node._id })
    sendMultiSelector('COLLAPSE')
  }

  // ============ hooks ====================
  const [selectedEntity, setSelectedEntity] = React.useState(dbSelectedEntity)
  const [selectedEntities, setSelectedEntities] = React.useState(
    dbSelectedEntities,
  )
  const [treeData, setTreeData] = React.useState(null)
  React.useEffect(() => {
    if (treeData !== null) {
      childRef.current.draw(treeData, selectedEntity)
    }
  }, [treeData, selectedEntity])

  let welcomeScreen = true
  const [nodes, setNodes] = React.useState(dbNodes)
  React.useEffect(() => {
    if (welcomeScreen && nodes.length > 0) {
      welcomeScreen = false
      const node = nodes[0]
      stateSwitcherCallback(node)
    }
  }, [nodes])

  // ============ React elements ====================
  const nodeElements = nodes.map(node => {
    return React.createElement(SelectorListItem, {
      node,
      stateSwitcherCallback,
      key: node._id,
      machine: {
        state: stateSwitcher,
        send: sendSwitcher,
        service: serviceSwitcher,
      },
    })
  })

  const nodeContainer = React.createElement(
    StyledNodeContainer,
    {},
    nodeElements,
  )

  const d3Container = React.createElement(D3RadioSelectorTreeContainer, {
    ref: childRef,
    updateDatabaseMetaData,
    machine: {
      state: stateMultiSelector,
      send: sendMultiSelector,
      service: serviceMultiSelector,
    },
  })

  // ============ debug ====================
  let debugContainer = null
  if (debug) {
    debugContainer = generateDebugContainer()
  }

  const Wrapper = React.createElement(
    ElementWrapper,
    null,
    nodeContainer,
    d3Container,
    debugContainer,
  )

  return Wrapper
}

function generateDebugContainer() {
  const info = React.createElement('div', null, `D3TreeRadioButton:`)
  const debug = React.createElement('div', null)

  return React.createElement('div', null, info, debug)
}

D3TreeRadioButton.defaultProps = {
  dbNodes: [],
  debug: false,
}

D3TreeRadioButton.propTypes = {}

// ============ D3RadioSelectorTreeContainer ====================
class D3RadioSelectorTreeContainer extends React.Component {
  constructor(props) {
    super(props)

    this.machine = props.machine
    this.updateDatabaseMetaData = props.updateDatabaseMetaData

    this.container = null
    this.setContainerRef = element => {
      this.container = element
    }
  }

  draw(treeData, selectedEntity) {
    const width = 800

    const node = loadRadioButtonTree(
      width,
      treeData,
      selectedEntity,
      this.machine,
      this.updateDatabaseMetaData,
    )
    d3.select(this.container)
      .selectAll('*')
      .remove()
    d3.select(this.container).append(() => node)
  }

  render() {
    return React.createElement(SVGContainer, {
      ref: this.setContainerRef,
    })
  }
}

function loadRadioButtonTree(
  width,
  data,
  selectedEntity,
  machine,
  updateDatabaseMetaData,
) {
  /*** Required source code: if you want d3 to be able to receive machine state updates ***/
  machine.service.subscribe(newState => {
    machine.state = newState
  })

  const margin = { top: 20, right: 120, bottom: 20, left: 120 }
  const dx = 30
  const dy = Math.min(width / (3 + 2), dx * 10)
  const radius = (dx * 0.9) / 2

  const tree = d3.tree().nodeSize([dx, dy])
  const diagonal = d3
    .linkHorizontal()
    .x(d => d.y)
    .y(d => d.x)

  const root = d3.hierarchy(data)

  root.x0 = dy / 2
  root.y0 = 0

  const childNodeIsEmpty = (d, selectedEntity) => {
    if (d.depth && d.depth >= 1) {
      if (selectedEntity == null) return true

      return !selectedEntity.path.includes(d.data.path)
    }

    return false
  }

  root.descendants().forEach((d, i) => {
    d.id = i
    d._children = d.children

    const nodeIsEmpty = childNodeIsEmpty(d, selectedEntity)
    if (nodeIsEmpty) d.children = null
  })

  const svg = d3
    .create('svg')
    .attr('viewBox', [-margin.left, -margin.top, width, dx])
    .style('font', '12px sans-serif')
    .style('user-select', 'none')

  const gLink = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke-opacity', 0.25)
    .attr('stroke-width', 1.5)

  const gNode = svg
    .append('g')
    .attr('cursor', 'pointer')
    .attr('pointer-events', 'all')

  function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250
    const nodes = root.descendants().reverse()
    const links = root.links()

    // Compute the new tree layout.
    tree(root)

    let left = root
    let right = root
    root.eachBefore(node => {
      if (node.x < left.x) left = node
      if (node.x > right.x) right = node
    })

    const height = right.x - left.x + margin.top + margin.bottom

    const transition = svg
      .transition()
      .duration(duration)
      .attr('viewBox', [-margin.left, left.x - margin.top, width, height])
      .tween(
        'resize',
        window.ResizeObserver ? null : () => () => svg.dispatch('toggle'),
      )

    // Update the nodes…
    const node = gNode.selectAll('g').data(nodes, d => d.id)

    // Enter any new nodes at the parent's previous position.
    const loadCollapseClickHanlder = d => {
      d.children = d.children ? null : d._children
      update(d)
    }

    const extractNodeData = d => {
      const entity = d.data
      entity.parent = null
      if (entity.parent !== null) {
        entity.parent = d.parent.data
      }

      return entity
    }

    const fill = d => {
      const colors = {
        hasChildren: '#555',
        default: '#999',
      }

      if (d.entityActive) {
        colors.hasChildren = entityActiveColour
        colors.default = '#d500f9'
      }

      return d._children ? colors.hasChildren : colors.default
    }

    const loadEntityClickHandler = (event, d, element) => {
      event.preventDefault()

      d.entityActive = !d.entityActive

      // Update selected entities
      const entity = extractNodeData(d)
      if (d.entityActive) {
        machine.send('ADD_ENTITY', { data: entity })
      } else {
        machine.send('REMOVE_ENTITY', { data: entity })
      }

      updateDatabaseMetaData(machine.state.context.dbSelectedEntities)

      const colour = fill(d)
      const parent = d3.select(element)
      parent.select('circle').style('fill', colour)
      parent.selectAll('text').attr('fill', colour)

      machine.send('SELECT_ENTITY')
    }

    const nodeEnterOnClickHandler = function(event, d) {
      if (machine.state.matches('collapse')) {
        loadCollapseClickHanlder(d)
      }

      if (machine.state.matches('select_entity')) {
        loadEntityClickHandler(event, d, this)
      }
    }

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('class', 'node-enter')
      .on('click', nodeEnterOnClickHandler)

    nodeEnter
      .append('circle')
      .attr('r', radius)
      .attr('fill', fill)
      .attr('stroke-width', 1)

    const labelX = d => (d._children ? -radius * 1.2 : radius * 1.2)

    nodeEnter
      .append('text')
      .attr('dy', '0.31em')
      .attr('x', labelX)
      .attr('fill', fill)
      .attr('text-anchor', d => (d._children ? 'end' : 'start'))
      .text(d => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white')

    // Transition nodes to their new position.
    const nodeUpdate = node
      .merge(nodeEnter)
      .transition(transition)
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1)

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node
      .exit()
      .transition(transition)
      .remove()
      .attr('transform', d => `translate(${source.y},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)

    // Update the links…
    const link = gLink.selectAll('path').data(links, d => d.target.id)

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .append('path')
      .attr('d', d => {
        const o = { x: source.x0, y: source.y0 }
        return diagonal({ source: o, target: o })
      })
      .style('stroke', function(d) {
        return '#000'
      })

    // Transition links to their new position.
    link
      .merge(linkEnter)
      .transition(transition)
      .attr('d', diagonal)

    // Transition exiting nodes to the parent's new position.
    link
      .exit()
      .transition(transition)
      .remove()
      .attr('d', d => {
        const o = { x: source.x, y: source.y }
        return diagonal({ source: o, target: o })
      })

    // Stash the old positions for transition.
    root.eachBefore(d => {
      d.x0 = d.x
      d.y0 = d.y
    })
  }

  update(root)

  return svg.node()
}

export default D3TreeRadioButton
