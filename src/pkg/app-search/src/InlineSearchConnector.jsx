import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './state/actions'

const mapDispatchToProps = (dispatch, {componentid}) => {

  return ({
    setSearch: function(search) {
      dispatch(Actions.onChangeSearch({componentid, search}))
    },
    setKeyword: function(keyword) {
      dispatch(Actions.onChangeKeyword({componentid, keyword}))
    }
  })
}

const mapStateToProps = (state, {componentid}) => {
  return {component: state.app.search[componentid]};
};

// Check the device
export const InlineSearchConnector = connect(mapStateToProps, mapDispatchToProps);
export const InlineSearchExternalConnector = (name = "search") => connect((state, {componentid}) => {

  if (!state.app.search[componentid + "_" + name]) {
    return {[name]: ""};
  } else {
    return {
      [name]: state.app.search[componentid + "_" + name].keyword
    };
  }

});
