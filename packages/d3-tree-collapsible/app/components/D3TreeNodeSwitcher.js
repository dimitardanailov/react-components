import D3TreeNodeSwitcherMachine from './machines/TreeNodeSwitcher'
import createTreeMultiSelectorStateMachine from './machines/TreeMultiSelectorStateMachine'
import createTreeStateMachine from './machines/TreeStateMachine'
const { useMachine } = XStateReact

const ElementWrapper = window.styled.div`
  margin: 1rem;
`

const SVGContainer = window.styled.div`
  position: relative;

  border: 2px solid #808080;
`

const entityActiveColour = 'purple'

const Switcher = window.styled.button`
  position: relative;

  padding: 0.8rem;
  border-radius: 12.5%;
  border: 2px solid ${props =>
    props.checked ? entityActiveColour : '#808080'};
  background: ${props => (props.checked ? entityActiveColour : '#fff')};

  &:focus {
    outline: none;
  }
`

const ParentContainer = window.styled.div`
  position: relative;

  display: flex;
  flex-direction row;
  justify-content: flex-start;
  align-items: center;
`

// ============ D3TreeNodeSwitcher ====================
function D3TreeNodeSwitcher({
  dbNodes,
  dbSelectedEntities,
  entityType,
  debug,
  updateParentChildRelationship,
}) {
  // ============ State machines ====================
  const machine = createTreeMultiSelectorStateMachine({
    entity: {
      _id: '1',
      name: 'Test',
    },
  })
  const [
    stateMultiSelector,
    sendMultiSelector,
    serviceMultiSelector,
  ] = useMachine(machine)

  const [stateSwitcher, sendSwitcher] = useMachine(D3TreeNodeSwitcherMachine)
  const stateSwitcherCallback = node => {
    const _treeData = updateParentChildRelationship(node._id)
    setTreeData(_treeData)
    sendSwitcher('MAIN_NODE_IS_SELECTED')
    sendMultiSelector('COLLAPSE')
  }

  // ============ referiencies ====================
  const childRef = React.useRef()

  // ============ hooks ====================
  const [selectedEntities, setSelectedEntities] = React.useState(
    dbSelectedEntities,
  )
  const [treeData, setTreeData] = React.useState(null)
  React.useEffect(() => {
    if (treeData !== null) {
      childRef.current.draw(treeData, selectedEntities)
    }
  }, [treeData, selectedEntities])

  const [nodes, setNodes] = React.useState(dbNodes)

  // ============ debug ====================
  const _machine = createTreeStateMachine({
    child: {
      _id: '1',
      name: 'Test',
    },
  })
  const [state, send, service] = useMachine(_machine)
  let debugContainer = null
  if (debug) {
    const generateTreeNodeSwitcherDebugData = () => {
      const info = React.createElement(
        'div',
        null,
        `D3TreeNodeSwitcherMachine: ${stateSwitcher.value}`,
      )

      const debug = React.createElement(
        'div',
        null,
        JSON.stringify(stateSwitcher.context),
      )

      return React.createElement('div', null, info, debug)
    }
    const debugTreeNodeSwitcher = generateTreeNodeSwitcherDebugData()

    const generateTreeMultiSelectorDebugData = () => {
      const info = React.createElement(
        'div',
        null,
        `D3TreeMultiSelectorStateMachine: ${stateMultiSelector.value} | ${state.value}`,
      )

      const debug = React.createElement(
        'div',
        null,
        JSON.stringify(stateMultiSelector.context),
      )

      return React.createElement('div', null, info, debug)
    }
    const debugTreeMultiSelectorDebugData = generateTreeMultiSelectorDebugData()

    debugContainer = React.createElement(
      'div',
      null,
      debugTreeNodeSwitcher,
      debugTreeMultiSelectorDebugData,
    )
  }

  // ============ React elements ====================
  const listItems = nodes.map(node => {
    return React.createElement(SelectorListItem, {
      node,
      stateSwitcherCallback,
      key: node._id,
    })
  })

  // ============ Entity Switcher ====================
  const entityInfoSwitcherLabel = React.createElement(
    'span',
    {
      className: 'ml-2',
    },
    typeof stateMultiSelector.context.parent === 'object'
      ? `Entity ${entityType}: ${state.context.entity.name}`
      : `Entity ${entityType}: {name of selected ${entityType}}`,
  )
  const switcherCollapseModeSelectEntityMode = React.createElement(
    Switcher,
    {
      checked: stateMultiSelector.matches('select_entity'),
      onClick: () => {
        console.log('state', state)
        if (stateMultiSelector.matches('collapse')) {
          sendMultiSelector('SELECT_ENTITY')
          send('SELECT_PARENT')
        } else {
          sendMultiSelector('COLLAPSE')
          send('COLLAPSE')
        }
      },
    },
    '',
  )
  const entitySwitcherContainer = React.createElement(
    ParentContainer,
    null,
    switcherCollapseModeSelectEntityMode,
    entityInfoSwitcherLabel,
  )

  const d3Container = React.createElement(D3MultiSelectorTreeContainer, {
    ref: childRef,
    state: state,
    machine: {
      state,
      send,
    },
  })

  const Wrapper = React.createElement(
    ElementWrapper,
    null,
    listItems,
    debugContainer,
    entitySwitcherContainer,
    d3Container,
  )

  return Wrapper
}

D3TreeNodeSwitcher.defaultProps = {
  dbNodes: [],
  debug: true,
  entityType: 'entity',
  updateParentChildRelationship: () => {},
}

D3TreeNodeSwitcher.propTypes = {}

// ============ SelectorListItem ====================
const StyledSelectorListItem = window.styled.div`
  position: relative;

  margin: 1rem;
`

function SelectorListItem({ node, stateSwitcherCallback }) {
  const clickListener = () => {
    stateSwitcherCallback(node)
  }

  return React.createElement(
    StyledSelectorListItem,
    { key: node._id, onClick: clickListener },
    node.name,
  )
}

// ============ D3MultiSelectorTreeContainer ====================
class D3MultiSelectorTreeContainer extends React.Component {
  constructor(props) {
    super(props)

    this.container = null

    this.machine = props.machine
    this.state = props.state

    this.setContainerRef = element => {
      this.container = element
    }
  }

  draw(treeData, selectedEntities) {
    const width = 800
    const node = loadTree(
      width,
      treeData,
      selectedEntities,
      this.machine,
      this.state,
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

function loadTree(width, data, selectedEntities, machine, state) {
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

  const entityIsActive = (d, selectedEntities) => {
    let entityActive = false

    for (let i = 0; i < selectedEntities.length; i++) {
      const entitityId = d.data._id
      const selectedEntityId = selectedEntities[i]._id
      entityActive = entitityId === selectedEntityId

      if (entityActive) {
        console.log('name', d.data.name)
        break
      }
    }

    return entityActive
  }

  root.descendants().forEach((d, i) => {
    d.id = i
    d.originalColor = '#999'
    d._children = d.children
    d.entityActive = entityIsActive(d, selectedEntities)
    if (d.depth && d.depth >= 1) d.children = null
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

    const fill = d => {
      const colors = {
        hasChildren: '#555',
        default: '#999',
      }

      if (d.entityActive) {
        colors.hasChildren = entityActiveColour
        colors.default = '#66c2a5'
      }

      return d._children ? colors.hasChildren : colors.default
    }

    const loadEntityClickHandler = (event, d, element) => {
      event.preventDefault()

      d.entityActive = !d.entityActive
      const colour = fill(d)
      const parent = d3.select(element)
      parent.select('circle').style('fill', colour)
      parent.selectAll('text').attr('fill', colour)
    }

    const nodeEnterOnClickHandler = function(event, d) {
      loadEntityClickHandler(event, d, this)
      /*
      if (machine.state.matches('collapse')) {
        loadCollapseClickHanlder(d)
      }

      if (machine.state.matches('select_entity')) {
        loadEntityClickHandler(event, d, this)
      }*/
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

export default D3TreeNodeSwitcher
