import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './actions'

const mapDispatchToProps = function(dispatch, {componentid, initialFilters}) {

  return ({
    initList: function(filters) {
      dispatch(Actions.onInit({componentid, filters}))
    },
    changeFilter: function(filterid, active) {
      dispatch(Actions.onChangeFilter({componentid, filterid, active, initialFilters}))
    }
  })
}

const mapStateToProps = function(state, {componentid, initialFilters}) {

  if (!state.app.list[componentid]) {
    return {listState: initialFilters};
  } else {
    return {listState: state.app.list[componentid]};
  }
};

export const ListConnector = connect(mapStateToProps, mapDispatchToProps);
