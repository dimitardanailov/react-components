import {
  StyledSelectorListItem,
  StyledSelectorListTextItem,
} from './styled-components/sharable'

function SelectorListItem({ node, stateSwitcherCallback, machine }) {
  const clickListener = () => {
    stateSwitcherCallback(node)
  }

  const TextItem = React.createElement(
    StyledSelectorListTextItem,
    {
      checked: machine.state.context.activeNodeId === node._id,
    },
    node.name,
  )

  return React.createElement(
    StyledSelectorListItem,
    {
      key: node._id,
      onClick: clickListener,
    },
    TextItem,
  )
}

export default SelectorListItem
