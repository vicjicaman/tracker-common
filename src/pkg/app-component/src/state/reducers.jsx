import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onSetPayload]: (state, {
    payload: {
      componentid,
      payload
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...payload
    };

    return currState;
  },
  [Actions.onResetPayload]: (state, {payload: {
      componentid
    }}) => {

    const currState = {
      ...state
    };

    if (currState[componentid]) {
      delete currState[componentid];
    }

    return currState;
  }
}, {});
