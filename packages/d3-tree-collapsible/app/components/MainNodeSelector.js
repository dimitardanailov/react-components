import { node } from 'prop-types'

const ElementWrapper = window.styled.div`
  margin: 1rem;
`

function MainNodeSelector({ nodes, debug }) {
  // ============ debug ====================
  let debugContainer = null
  if (debug) {
    const info = React.createElement('div', null, `Mode:`)
    const debug = React.createElement('div', null)
    debugContainer = React.createElement('div', null, info, debug)
  }

  const listItems = nodes.map(node => {
    return React.createElement('li', null, node.name)
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

export default MainNodeSelector
