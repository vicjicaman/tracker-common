import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'
import {findQuery, findQueryIndex} from '../utils'

export const reducers = handleActions({
  [Actions.onQueryStatusChange]: (state, {
    payload: {
      queryid,
      variables,
      status
    }
  }) => {

    const currState = {
      ...state
    };
    currState.refetch = [...currState.refetch];

    const idx = findQueryIndex(currState.refetch, {queryid, variables});

    const previous = state.refetch[idx]
      ? state.refetch[idx].status
      : null;

    //console.log("UPDATE QUERY " + idx + "    " + previous + "   >   " + status)
    //console.log(queryid + "   " + JSON.stringify(variables));

    /*if (previous === "started" && status === "prefetch") {
      return state;
    }*/

    if (idx !== -1) {
      const curr = currState.refetch[idx];
      currState.refetch.splice(idx, 1, {
        ...curr,
        status
      });
    } else {
      currState.refetch.push({queryid, variables, status});
    }

    return currState;
  }
}, {refetch: []});

/*

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
[Actions.onQueryStatusChange]: (state, {
  payload: {
    queryid,
    variables,
    status
  }
}) => {

  const idx = findQueryIndex(state.refetch, {queryid, variables});
  if (idx !== -1) {
    //console.log("FOUND QUERY TO CHANGE STATE")
    const currState = {
      ...state
    };
    currState.refetch = [...currState.refetch];
    const curr = currState.refetch[idx];
    currState.refetch.splice(idx, 1);
    currState.refetch.push({
      ...curr,
      status
    });
    return currState;
  } else {
    return state;
  }

},
*/

/*





   (state, action) => {
    return handleQueryStatus(state, action, "prefetch");

  },

  /////////////////////////////////////////////////////////////////////////////
  [Actions.onRefetchQueryStart]: (state, {
    payload: {

      queryid,
      variables
    }
  }) => {

    const currState = {
      ...state
    };
    currState.refetch = [...currState.refetch];

    const idx = findQueryIndex(currState.refetch, {, queryid, variables});

    if (idx !== -1) {
      //console.log("FOUND QUERY TO CHANGE STATE")

      const curr = currState.refetch[idx];
      currState.refetch.splice(idx, 1, {
        ...curr,
        status: "started"
      });

    } else {
      currState.refetch.push({, queryid, variables, status: "started"});
    }

    return currState;
  },
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  [Actions.onQueryRefetch]: (state, {
    payload: {
      ,
      queryid,
      variables
    }
  }) => {

    const idx = findQueryIndex(state.refetch, {, queryid, variables});
    if (idx !== -1) {
      //console.log("FOUND QUERY TO CHANGE STATE")
      const currState = {
        ...state
      };
      currState.refetch = [...currState.refetch];
      const curr = currState.refetch[idx];
      currState.refetch.splice(idx, 1, {
        ...curr,
        status: "refetching"
      });
      return currState;
    } else {
      return state;
    }

  },

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  [Actions.onQueryRefetched]: (state, {payload: queryObj}) => {

    const currState = {
      ...state
    };
    currState.refetch = [...currState.refetch];

    const idx = findQueryIndex(currState.refetch, queryObj);

    if (idx !== -1) {
      currState.refetch.splice(idx, 1);
    }

    return currState;
  },

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  [Actions.onQueryRefetchFailed]: (state, {payload: queryObj}) => {

    const currState = {
      ...state
    };
    currState.refetch = [...currState.refetch];

    const idx = findQueryIndex(currState.refetch, queryObj);

    if (idx !== -1) {
      //console.log("FOUND QUERY TO CHANGE STATE")
      const currState = {
        ...state
      };
      currState.refetch = [...currState.refetch];
      const curr = currState.refetch[idx];
      currState.refetch.splice(idx, 1, {
        ...curr,
        status: "started" //"prefetch"
      });
      return currState;
    }

    return currState;
  }

*/
