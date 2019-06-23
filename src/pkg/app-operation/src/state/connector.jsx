import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './actions'

const mapDispatchToProps = function(dispatch) {

  return ({
    initOperations: function(operations) {
      dispatch(Actions.onInit({operations}))
    },
    updateOperation: function(operation) {
      dispatch(Actions.onUpdateOperation({operation}))
    }
  })
}

const mapStateToProps = function(state, {componentid, initialFilters}) {
  return {operationList: state.app.operation.list||[]};
};

export const OperationConnector = connect(mapStateToProps, mapDispatchToProps);
