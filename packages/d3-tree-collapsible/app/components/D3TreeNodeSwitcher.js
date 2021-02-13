import { node } from 'prop-types'

const ElementWrapper = window.styled.div`
  margin: 1rem;
`

// ============ MainNodeSelector ====================
function MainNodeSelector({ nodes, debug }) {
  // ============ debug ====================
  let debugContainer = null
  if (debug) {
    const info = React.createElement('div', null, `Mode:`)
    const debug = React.createElement('div', null)
    debugContainer = React.createElement('div', null, info, debug)
  }

  const listItems = nodes.map(node => {
    return React.createElement(SelectorListItem, {
      node,
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

function SelectorListItem({ node }) {
  const clickListener = () => {
    const id = node._id
    console.log('node', node)
  }

  return React.createElement(
    StyledSelectorListItem,
    { key: node._id, onClick: clickListener },
    node.name,
  )
}

export default MainNodeSelector
