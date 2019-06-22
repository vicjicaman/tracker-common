import _ from 'lodash'
import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onInit]: (state, {
    payload: {
      componentid,
      filters
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      filters: _.reduce(filters, (res, val) => {

        res[val.filterid] = {
          active: val.active
        };

        return res;
      }, {})
    };

    return currState;
  },
  [Actions.onChangeFilter]: (state, {
    payload: {
      componentid,
      filterid,
      active,
      initialFilters
    }
  }) => {

    const currState = {
      ...state
    };
    currState[componentid] = {
      ...(currState[componentid] || initialFilters)
    };

    const currComp = currState[componentid];

    currComp.filters = {
      ...currComp.filters,
      [filterid]: {
        ...currComp.filters[filterid],
        active
      }
    };

    return currState;
  }
}, {});
