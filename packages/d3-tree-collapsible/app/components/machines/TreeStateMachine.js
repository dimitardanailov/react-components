const { Machine, assign } = XState

const dataIsValid = (context, _) => {
  if (typeof context.child === 'object' && typeof context.parent === 'object') {
    return true
  }

  return false
}

const TreeStateMachine = Machine(
  {
    id: 'D3TreeMachine',
    initial: 'collapse',
    context: {
      child: undefined,
      parent: undefined,
    },
    states: {
      collapse: {
        on: {
          SELECT_CHILD: 'select_child',
          SELECT_PARENT: 'select_parent',
        },
      },
      select_child: {
        on: {
          COLLAPSE: 'collapse',
          SELECT_PARENT: 'select_parent',
          SET_CHILD: {
            target: 'set_child',
            actions: assign({
              child: (_, event) => {
                const params = {
                  _id: event.child._id,
                  name: event.child.name,
                }
                return params
              },
            }),
          },
        },
      },
      set_child: {
        on: {
          SELECT_CHILD: 'select_child',
          SEND_DATA: {
            target: 'send_data',
            cond: dataIsValid,
          },
        },
      },
      select_parent: {
        on: {
          COLLAPSE: 'collapse',
          SELECT_CHILD: 'select_child',
          SET_PARENT: {
            target: 'set_parent',
            actions: assign({
              parent: (_, event) => {
                const params = {
                  _id: event.parent._id,
                  name: event.parent.name,
                }
                return params
              },
            }),
          },
        },
      },
      set_parent: {
        on: {
          SELECT_PARENT: 'select_parent',
          SEND_DATA: {
            target: 'send_data',
            cond: dataIsValid,
          },
        },
      },
      send_data: {
        on: {
          DRAW_TREE: 'draw_tree',
        },
      },
      draw_tree: {},
    },
  },
  {
    guards: {
      dataIsValid,
    },
  },
)

export default TreeStateMachine
