import { useMachine } from '@xstate/react'

import createTreeNodeSwitcher from './machines/TreeNodeSwitcher'

import SelectorListItem from './SelectorListItem'

import {
  ElementWrapper,
  SVGContainer,
  ParentContainer,
  StyledNodeContainer,
} from './styled-components/sharable'

// ============ D3TreeRadioButton ====================
function D3TreeRadioButton({ dbNodes, debug }) {
  // ============ State machines ====================
  const [stateSwitcher, sendSwitcher, serviceSwitcher] = useMachine(
    createTreeNodeSwitcher(),
  )

  // ============ referiencies ====================
  const childRef = React.useRef()

  // Callbacks
  const stateSwitcherCallback = async node => {}

  // ============ hooks ====================
  const [treeData, setTreeData] = React.useState(null)
  React.useEffect(() => {
    if (treeData !== null) {
      childRef.current.draw(treeData)
    }
  }, [treeData])

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

  const d3Container = React.createElement(D3RadioSelectorTreeContainer, {
    ref: childRef,
  })

  // ============ debug ====================
  let debugContainer = null
  if (debug) {
    debugContainer = generateDebugContainer()
  }

  const Wrapper = React.createElement(
    ElementWrapper,
    null,
    nodeElements,
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

    this.container = null
    this.setContainerRef = element => {
      this.container = element
    }
  }

  draw(treeData) {
    const width = 800
  }

  render() {
    return React.createElement(SVGContainer, {
      ref: this.setContainerRef,
    })
  }
}

export default D3TreeRadioButton
