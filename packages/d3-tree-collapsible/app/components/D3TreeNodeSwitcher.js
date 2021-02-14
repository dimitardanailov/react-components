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
  }

  render() {
    return React.createElement(SVGContainer, {
      ref: this.setContainerRef,
    })
  }
}

export default D3TreeNodeSwitcher
