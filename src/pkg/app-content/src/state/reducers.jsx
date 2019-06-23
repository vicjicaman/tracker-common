import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onChangeSection]: (state, {
    payload: {
      componentid,
      section
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(currState[componentid] || {}),
      section
    };

    return currState;
  },
  [Actions.onChangeWindowMode]: (state, {
    payload: {
      componentid,
      mode
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(currState[componentid] || {}),
      mode
    };

    return currState;
  }
}, {});
