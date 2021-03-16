const { Machine, assign } = XState

function createTreeRadioButtonStateMachine({ dbSelectedEntity }) {
  return Machine({
    id: 'D3TreeRadioButtonStateMachine',
    initial: 'collapse',
    context: {
      dbSelectedEntity,
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
          ADD_ENTITY: {
            target: 'add_entity',
            actions: assign((context, event) => {
              const entity = event.data
              context.dbSelectedEntity = entity
            }),
          },
        },
      },
      add_entity: {
        on: {
          SELECT_ENTITY: 'select_entity',
        },
      },
    },
  })
}

export default createTreeRadioButtonStateMachine
