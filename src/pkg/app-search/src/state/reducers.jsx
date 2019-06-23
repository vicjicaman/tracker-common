import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onChangeSearch]: (state, {
    payload: {
      componentid,
      search
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(currState[componentid] || {}),
      search:{
        value: search
      }
    };

    return currState;
  },
  [Actions.onChangeKeyword]: (state, {
    payload: {
      componentid,
      keyword
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(currState[componentid] || {}),
      keyword:{
        value: keyword
      }
    };

    return currState;
  }
}, {});
