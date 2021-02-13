import D3TreeNodeSwitcher from './machines/TreeNodeSwitcher'
const { useMachine } = XStateReact

const ElementWrapper = window.styled.div`
  margin: 1rem;
`

// ============ MainNodeSelector ====================
function MainNodeSelector({ nodes, debug }) {
  // ============ state switcher ====================
  const [stateSwitcher, sendSwitcher] = useMachine(D3TreeNodeSwitcher)
  const stateSwitcherCallback = node => {
    console.log('stateSwitcherCallback', node)
  }

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

  const listItems = nodes.map(node => {
    return React.createElement(SelectorListItem, {
      node,
      stateSwitcherCallback,
      key: node._id,
    })
  })

  const Wrapper = React.createElement(
    ElementWrapper,
    null,
    listItems,
    debugContainer,
  )

  return Wrapper
}

MainNodeSelector.defaultProps = {
  nodes: [],
  debug: true,
}

MainNodeSelector.propTypes = {}

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

export default MainNodeSelector
