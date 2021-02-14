import D3TreeNodeSwitcherMachine from './machines/TreeNodeSwitcher'
const { useMachine } = XStateReact

const ElementWrapper = window.styled.div`
  margin: 1rem;
`

const SVGContainer = window.styled.div`
  position: relative;

  border: 2px solid #808080;
`

// ============ D3TreeNodeSwitcher ====================
function D3TreeNodeSwitcher({ nodes, debug, updateParentChildRelationship }) {
  // ============ referiencies ====================
  const childRef = React.useRef()

  // ============ hooks ====================
  const [treeData, setTreeData] = React.useState(1)

  // ============ State machines ====================
  const [stateSwitcher, sendSwitcher] = useMachine(D3TreeNodeSwitcherMachine)
  const stateSwitcherCallback = node => {
    const _treeData = updateParentChildRelationship(node._id)
    setTreeData(_treeData)
  }

  // ============ useEffect ====================
  React.useEffect(() => {
    childRef.current.draw(treeData)
  }, [treeData])

  // ============ debug ====================
  let debugContainer = null
  if (debug) {
    const info = React.createElement(
      'div',
      null,
      `Active mode: ${stateSwitcher.value}`,
    )
    const debug = React.createElement(
      'div',
      null,
      JSON.stringify(stateSwitcher.context),
    )
    debugContainer = React.createElement('div', null, info, debug)
  }

  // ============ React elements ====================
  const listItems = nodes.map(node => {
    return React.createElement(SelectorListItem, {
      node,
      stateSwitcherCallback,
      key: node._id,
    })
  })

  const d3Container = React.createElement(D3MultiSelectorTreeContainer, {
    ref: childRef,
  })

  const Wrapper = React.createElement(
    ElementWrapper,
    null,
    listItems,
    debugContainer,
    d3Container,
  )

  return Wrapper
}

D3TreeNodeSwitcher.defaultProps = {
  nodes: [],
  debug: true,
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

    this.setContainerRef = element => {
      this.container = element
    }
  }

  draw(treeData) {
    console.log('D3MultiSelectorTreeContainer.treeData', treeData)

    const width = 800
    const node = loadTree(width, treeData)

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

function loadTree(width, data) {
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
  root.descendants().forEach((d, i) => {
    d.id = i
    d._children = d.children
    if (d.depth && d.data.name.length !== 7) d.children = null
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
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', d => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .on('click', (event, d) => {
        d.children = d.children ? null : d._children
        update(d)
      })

    const fill = d => {
      return d._children ? '#555' : '#999'
    }

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
