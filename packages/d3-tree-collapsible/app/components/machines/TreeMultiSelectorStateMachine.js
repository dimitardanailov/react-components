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
          ADD_ENTITY: 'add_entity',
          REMOVE_ENTITY: 'remove_entity',
        },
      },
      add_entity: {
        on: {
          SELECT_ENTITY: 'select_entity',
          REMOVE_ENTITY: 'remove_entity',
        },
      },
      remove_entity: {
        on: {
          SELECT_ENTITY: 'select_entity',
          ADD_ENTITY: 'add_entity',
        },
      },
    },
  })
}

export default createTreeMultiSelectorStateMachine
