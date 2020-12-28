const { Machine, assign } = XState

const dataIsValid = (context, _) => {
  if (typeof context.child === 'object' && typeof context.parent === 'object') {
    return true
  }

  return false
}

const setData = (_, event) => {
  const params = {
    _id: event.data._id,
    name: event.data.name,
  }
  return params
}

const updateRelationShipConf = {
  target: 'update_relationship',
  cond: dataIsValid,
}

function createTreeStateMachine({ child }) {
  return Machine(
    {
      id: 'D3TreeMachine',
      initial: 'collapse',
      context: {
        child: child,
        parent: undefined,
      },
      states: {
        collapse: {
          on: {
            SELECT_CHILD: 'select_child',
            SELECT_PARENT: 'select_parent',
            UPDATE_RELATIONSHIP: updateRelationShipConf,
          },
        },
        select_child: {
          on: {
            COLLAPSE: 'collapse',
            SELECT_PARENT: 'select_parent',
            SET_CHILD: {
              target: 'set_child',
              actions: assign({
                child: setData,
              }),
            },
            UPDATE_RELATIONSHIP: updateRelationShipConf,
          },
        },
        set_child: {
          on: {
            SELECT_CHILD: 'select_child',
          },
        },
        select_parent: {
          on: {
            COLLAPSE: 'collapse',
            SELECT_CHILD: 'select_child',
            SET_PARENT: {
              target: 'set_parent',
              actions: assign({
                parent: setData,
              }),
            },
            UPDATE_RELATIONSHIP: updateRelationShipConf,
          },
        },
        set_parent: {
          on: {
            SELECT_PARENT: 'select_parent',
          },
        },
        update_relationship: {
          on: {
            DRAW_TREE: 'draw_tree',
          },
        },
        draw_tree: {
          on: {
            COLLAPSE: {
              target: 'collapse',
              actions: assign(() => {
                return {
                  parent: undefined,
                }
              }),
            },
          },
        },
      },
    },
    {
      guards: {
        dataIsValid,
      },
    },
  )
}

export default createTreeStateMachine
