import _ from 'lodash'
import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

const mapOperation = ({
  operationid,
  status,
  config,
  visibility,
  params,
  message,
  data
}) => ({
  operationid,
  status,
  config,
  visibility,
  params,
  message,
  data
});

export const reducers = handleActions({
  [Actions.onInit]: (state, {payload: {
      operations
    }}) => {

    const currState = {
      ...state
    };

    currState.list = _.map(operations, op => mapOperation(op))
    return currState;
  },
  [Actions.onUpdateOperation]: (state, {payload: {
      operation
    }}) => {

    const currState = {
      ...state
    };

    currState.list = [...state.list]
    const opIdx = _.findIndex(currState.list, {operationid: operation.operationid});

    if (opIdx !== -1) {
      if (operation.status === "handled" || operation.visibility === "hidden") {
        delete currState.list.splice(opIdx, 1);
      } else {
        currState.list[opIdx] = mapOperation(operation);
      }

    } else {
      if (operation.status !== "handled" && operation.visibility !== "hidden") {
        currState.list.push(mapOperation(operation))
      }
    }

    /*if (opIdx === -1) {


    } else {
      if (operation.visibility !== "hidden") {
        currState.list[opIdx] = mapOperation(operation);
      } else {
        delete currState.list.splice(opIdx, 1);
      }

    }*/

    return currState;
  }
}, {});
