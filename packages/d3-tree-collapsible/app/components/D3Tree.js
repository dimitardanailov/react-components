function paintCircle(_, d) {
  const circle = d3.select(this)
  d.childActive = !d.childActive

  if (d.childActive) {
    circle.style('fill', 'red')
  } else {
    circle.style('fill', d.originalColor)
  }
}

class D3Tree extends React.Component {
  constructor(props) {
    super(props)

    this.data = props.data

    this.jsonRecord = props.jsonRecord

    this.div = null

    this.setDivRef = element => {
      this.div = element
    }

    this.btnUpdateTree = null
    this.setBtnUpdateTreeRef = element => {
      this.btnUpdateTree = element
    }

    this.btnExpandTree = null
    this.setBtnExpandTreeRef = element => {
      this.btnExpandTree = element
    }
  }

  componentDidMount() {
    const width = 800

    if (this.data !== null > 0 && this.jsonRecord !== null) {
      const node = loadTree(width, this.data, this.jsonRecord)
      d3.select(this.div).append(() => node)
    }

    d3.select(this.btnUpdateTree).on('click', () => {})
    // console.log('this.updateTree', this.btnUpdateTree, this.div)
    // console.log('this.expandTree', this.btnUpdateTree, this.div)

    // d3.select(this.btnExpandTree).on('click', () => {})
  }

  render() {
    // const Wrapper =
    const d3Container = React.createElement('div', {
      ref: this.setDivRef,
    })

    const updateTreeBtn = React.createElement(
      'button',
      {
        ref: this.setBtnExpandTreeRef,
      },
      'Test',
    )

    const Wrapper = React.createElement('div', null, updateTreeBtn, d3Container)

    return Wrapper

    /*
    return (
      <div>
        <button ref={this.setBtnExpandTreeRef}>Mode: Update tree</button>

        <button ref={this.setBtnUpdateTreeRef}>Mode: Collapse tree</button>

        <div ref={this.setDivRef}></div>
      </div>
    ) */
  }
}

function loadTree(width, data, record) {
  const margin = { top: 20, right: 120, bottom: 20, left: 120 }
  const dx = 30
  const dy = Math.min(width / (3 + 2), dx * 10)
  const radius = (dx * 0.9) / 2

  const child = null
  const parent = null

  const tree = d3.tree().nodeSize([dx, dy])
  const diagonal = d3
    .linkHorizontal()
    .x(d => d.y)
    .y(d => d.x)

  const root = d3.hierarchy(data)
  root.x0 = dy / 2
  root.y0 = 0

  root.x0 = dy / 2
  root.y0 = 0
  root.descendants().forEach((d, i) => {
    d.id = i
    d.originalColor = '#999'
    d._children = d.children

    const parents = record.path.split('#')
    if (!parents.includes(d.data._id)) {
      d.children = null
    }
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
        // d.children = d.children ? null : d._children
        // update(d)
      })

    const fill = d => {
      const match = d.data._id === record._id
      const colors = {
        hasChildren: '#555',
        default: '#999',
      }

      if (match) {
        colors.hasChildren = '#3288bd'
        colors.default = '#66c2a5'
      }

      d.originalColor = d._children ? colors.hasChildren : colors.default

      return d.originalColor
    }

    nodeEnter
      .append('circle')
      .attr('r', radius)
      .attr('fill', fill)
      .attr('stroke-width', 1)
      .on('click', paintCircle)

    const labelX = d => (d._children ? -radius * 1.2 : radius * 1.2)

    nodeEnter
      .append('text')
      .attr('dy', '-0em')
      .attr('x', labelX)
      .attr('fill', fill)
      .attr('text-anchor', d => (d._children ? 'end' : 'start'))
      .text(d => d.data.name)
      .clone(true)
      .lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white')

    nodeEnter
      .append('text')
      .attr('dy', '1.1em')
      .attr('x', labelX)
      .attr('text-anchor', d => (d._children ? 'end' : 'start'))
      .attr('fill', fill)
      .style('font', '10px sans-serif')
      .text(d => d.data.status)
      .clone(true)
      .lower()
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white')
      .append('tspan')
      .attr('dy', '0.3em')

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
        if (d.target.data.parent.includes(record._id)) {
          return '#3288bd'
        }

        if (d.target.data._id === record._id) {
          return d.target.children ? '#3288bd' : '#66c2a5'
        }

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

D3Tree.defaultProps = {
  data: null,
  jsonRecord: null,
}

D3Tree.propTypes = {}

export default D3Tree
