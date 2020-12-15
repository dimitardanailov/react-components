const { Machine } = XState

const TreeStateMachine = Machine({
  id: 'D3TreeMachine',
  initial: 'collapse',
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
