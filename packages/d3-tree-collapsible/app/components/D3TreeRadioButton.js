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
function D3TreeRadioButton({ dbNodes }) {
  const [nodes, setNodes] = React.useState(dbNodes)

  const [stateSwitcher, sendSwitcher, serviceSwitcher] = useMachine(
    createTreeNodeSwitcher(),
  )

  const stateSwitcherCallback = async node => {}

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

  console.log('stateSwitcher', nodeElements)

  const Wrapper = React.createElement(ElementWrapper, null, nodeElements)

  return Wrapper
}

export default D3TreeRadioButton
