const { Machine, assign } = XState

function createTreeNodeSwitcher() {
  return Machine({
    id: 'D3TreeNodeSwitcherMachine',
    initial: 'idle',
    states: {
      idle: {
        on: {
          MAIN_NODE_IS_SELECTED: 'main_node_is_selected',
        },
      },
      main_node_is_selected: {},
    },
  })
}

export default createTreeNodeSwitcher
