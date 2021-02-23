const { Machine, assign } = XState

const setData = (_, event) => {
  const entity = event.data
  console.log('entity', entity)

  // const params = {}
  // return params
}

const removeData = (_, event) => {
  const entity = event.data
  console.log('entity', entity)
}

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
          ADD_ENTITY: {
            target: 'add_entity',
            actions: assign({
              entity: setData,
            }),
          },
          REMOVE_ENTITY: {
            target: 'remove_entity',
            actions: assign({
              entity: removeData,
            }),
          },
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
