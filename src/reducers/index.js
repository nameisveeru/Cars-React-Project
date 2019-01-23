import { combineReducers } from 'redux';
import { SET_RECIPIES } from '../actions';

function recipies(state = [], action){
  switch(action.type){
    case SET_RECIPIES:
    return action.items;
    default:
    return state;
  }
}

const rootReducer = combineReducers({ recipies });

export default rootReducer;
