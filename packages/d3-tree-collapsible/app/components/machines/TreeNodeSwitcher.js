const { Machine, assign } = XState

const D3TreeNodeSwitcherMachine = Machine({
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

export default D3TreeNodeSwitcherMachine
