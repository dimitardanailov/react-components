const { Machine, assign } = XState

function createTreeMultiSelectorStateMachine({ entity }) {
  return Machine({
    id: 'D3TreeMultiSelectorStateMachine',
    initial: 'collapse',
    context: {
      entity: entity,
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