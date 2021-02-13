const { Machine, assign } = XState

const D3TreeNodeSwitcher = Machine({
  id: 'D3TreeNodeSwitcher',
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

export default D3TreeNodeSwitcher
