import { combineReducers } from 'redux';
import StarwarsReducer from './starwarsReducer';

export default combineReducers({
  items: StarwarsReducer
});
