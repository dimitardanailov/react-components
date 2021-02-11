const ElementWrapper = window.styled.div`
  margin: 1rem;
`

function MainNodeSelector({ debug }) {
  // ============ debug ====================
  let debugContainer = null
  if (debug) {
    const info = React.createElement('div', null, `Mode:`)
    const debug = React.createElement('div', null)
    debugContainer = React.createElement('div', null, info, debug)
  }

  const Wrapper = React.createElement(ElementWrapper, null, debugContainer)

  return Wrapper
}

MainNodeSelector.defaultProps = {
  debug: true,
}

MainNodeSelector.propTypes = {}

export default MainNodeSelector
