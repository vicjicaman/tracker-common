import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './actions'

const mapDispatchToProps = (dispatch, {componentid, initial}) => {

  return ({
    setPayload: function(payload) {
      dispatch(Actions.onSetPayload({componentid, payload}))
    },
    clearPayload: function() {
      dispatch(Actions.onClearPayload({componentid}))
    }
  })
}

const mapStateToProps = (state, {componentid, initial}) => {
  return {
    payload: state.app.component[componentid] || initial
  };
};

export const ComponentConnector = connect(mapStateToProps, mapDispatchToProps);
