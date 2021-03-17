const ToolbarWrapper = window.styled.nav`
  positon: relative;

  display: flex;
  flex-direction: row;
`

const StyledD3ToolbarDelimiter = window.styled.div`
  positiona: relative;

  display: inline-block;
  width: 2px;
  background-color: #808080;
  margin: 0 0.4rem;
`

function D3Toolbar(wrapperZoomButtons, treeModeSwitcher) {
  const delimiter = React.createElement(StyledD3ToolbarDelimiter)

  return React.createElement(
    ToolbarWrapper,
    null,
    wrapperZoomButtons,
    delimiter,
    treeModeSwitcher,
  )
}

export default D3Toolbar
