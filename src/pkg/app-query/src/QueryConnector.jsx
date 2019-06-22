import React from "react";
import _ from "lodash";
import {compose} from 'recompose';
import {connect} from 'react-redux';
import * as Actions from './state/actions'

const mapDispatchToProps = (dispatch, ownProps) => {

  return ({
    ["PrefetchQuery"]: ({ queryid, variables}) => {
      dispatch(Actions.onQueryStatusChange({ queryid, variables, status: "prefetch"}))
    },
    ["RefetchQueryStart"]: ({ queryid, variables}) => {
      dispatch(Actions.onQueryStatusChange({ queryid, variables, status: "started"}))
    },
    ["QueryRefetch"]: ({ queryid, variables}) => {
      dispatch(Actions.onQueryStatusChange({ queryid, variables, status: "refetching"}))
    },
    ["QueryRefetched"]: ({ queryid, variables}) => {
      dispatch(Actions.onQueryStatusChange({ queryid, variables, status: "refetched"}))
    },
    ["QueryRefetchFailed"]: ({ queryid, variables}) => {
      dispatch(Actions.onQueryStatusChange({ queryid, variables, status: "failed"}))
    }
  })
}

const mapStateToProps = (state, ownProps) => {
  return {queriesToRefetch: state.app.queries.refetch};
};

export const QueryActionConnector = connect(null, mapDispatchToProps)
export const QueryConnector = connect(mapStateToProps, mapDispatchToProps)
