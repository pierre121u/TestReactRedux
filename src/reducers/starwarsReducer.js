function StarwarsReducer(state = {item: []}, action) {
  switch(action.type){
    case 'FETCH_STARWARS':
      return {...state, item: action.payload, section: action.section}
    case 'FETCH_SCHEMA':
      return {...state, schema: action.schema}
    case 'FETCH_ONE':
      return {...state, oneItem: action.item}
    default:
      return state;
  }
}

export default StarwarsReducer;
