const { Machine, assign } = XState

function createTreeMultiSelectorStateMachine({ dbSelectedEntities }) {
  return Machine({
    id: 'D3TreeMultiSelectorStateMachine',
    initial: 'collapse',
    context: {
      dbSelectedEntities,
    },
    states: {
      collapse: {
        on: {
          SELECT_ENTITY: 'select_entity',
        },
      },
      select_entity: {
        on: {
          COLLAPSE: 'collapse',
        },
      },
    },
  })
}

export default createTreeMultiSelectorStateMachine
