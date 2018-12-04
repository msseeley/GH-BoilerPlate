const DUMMY_ACTION_TYPE = 'DUMMY_ACTION_TYPE'

const dummy_action_creator = data => ({ type: DUMMY_ACTION_TYPE, data })

const dummyReducer = (state, action) => {
  switch (action.type) {
    case DUMMY_ACTION_TYPE:
      return state
    default:
      return state
  }
}

export default dummyReducer
