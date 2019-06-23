import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onSubmit]: (state, {
    payload: {
      componentid,
      initial
    }
  }) => {

    const currState = {
      ...state
    };

    currState[componentid] = {
      ...(
        currState[componentid]
        ? currState[componentid]
        : {
          ...initial
        }),
      submit: true
    };

    return currState;
  },
  [Actions.onSubmitHandled]: (state, {
    payload: {
      componentid,
      initial
    }
  }) => {

    const currState = {
      ...state
    };

    currState[componentid] = {
      ...(
        currState[componentid]
        ? currState[componentid]
        : {
          ...initial
        }),
      submit: false
    };

    return currState;
  },
  [Actions.onInit]: (state, {
    payload: {
      componentid,
      initial
    }
  }) => {

    const currState = {
      ...state
    };

    currState[componentid] = {
      ...initial
    };

    return currState;
  },
  [Actions.onChangeField]: (state, {
    payload: {
      componentid,
      field,
      value,
      initial
    }
  }) => {

    const currState = {
      ...state
    };

    currState[componentid] = {
      ...(
        currState[componentid]
        ? currState[componentid]
        : {
          ...initial
        })
    };
    const currComp = currState[componentid];

    currComp.values = {
      ...currComp.values,
      [field]: {
        ...currComp.values[field],
        touched: true,
        value
      }
    };

    return currState;
  },
  [Actions.onTouchForm]: (state, {
    payload: {
      componentid,
      initial
    }
  }) => {
    /*if (!state[componentid]) {
      return state;
    }*/

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(
        currState[componentid]
        ? currState[componentid]
        : {
          ...initial
        })
    };
    const currComp = currState[componentid];

    currComp.values = {
      ...currComp.values
    };

    for (const field in currComp.values) {
      currComp.values[field] = {
        ...currComp.values[field],
        touched: true
      }
    }

    return currState;
  }
}, {});
