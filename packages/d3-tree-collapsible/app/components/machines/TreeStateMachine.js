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

const sendDataConf = {
  target: 'send_data',
  cond: dataIsValid,
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
          SEND_DATA: sendDataConf,
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
          SEND_DATA: sendDataConf,
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
          SEND_DATA: sendDataConf,
        },
      },
      set_parent: {
        on: {
          SELECT_PARENT: 'select_parent',
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
