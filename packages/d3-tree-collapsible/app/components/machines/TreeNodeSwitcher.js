const { Machine, assign } = XState

function createTreeNodeSwitcher() {
  return Machine({
    id: 'D3TreeNodeSwitcherMachine',
    initial: 'idle',
    context: {
      activeNodeId: null,
    },
    states: {
      idle: {
        on: {
          MAIN_NODE_IS_SELECTED: {
            on: 'main_node_is_selected',
            actions: assign((context, id) => {
              context.activeNodeId = id
            }),
          },
        },
      },
      main_node_is_selected: {},
    },
  })
}

export default createTreeNodeSwitcher
