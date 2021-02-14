const { Machine, assign } = XState

function createTreeMultiSelectorStateMachine({ child }) {
  return Machine({
    id: 'D3TreeMultiSelectorStateMachine',
    initial: 'collapse',
    context: {
      child: child,
      parent: undefined,
    },
    states: {
      collapse: {
        on: {
          SELECT_CHILD: 'select_child',
        },
      },
      select_child: {
        on: {
          COLLAPSE: 'collapse',
        },
      },
    },
  })
}

export default createTreeMultiSelectorStateMachine
