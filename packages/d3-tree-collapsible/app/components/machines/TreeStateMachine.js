const { Machine, assign } = XState

const TreeStateMachine = Machine({
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
      },
    },
    select_parent: {
      on: {
        COLLAPSE: 'collapse',
        SELECT_CHILD: 'select_child',
      },
    },
  },
})

export default TreeStateMachine
