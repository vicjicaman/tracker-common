import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onModalState]: (state, {
    payload: {
      componentid,
      open
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(currState[componentid] || {}),
      open
    };

    return currState;
  }
}, {});
