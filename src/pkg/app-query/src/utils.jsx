import React from "react";
import _ from "lodash"
import {lifecycle} from 'recompose';

const compareQuery = (a, b) => {
  let varsMatch = true;

  if (a.variables && b.variables) {
    for (const v in a.variables) {
      if (a.variables[v] !== b.variables[v]) {
        varsMatch = false;
      }
    }
  }

  return a.queryid === b.queryid && varsMatch;
}

export const filterByQuery = (queries, a) => _.filter(queries, b => compareQuery(a, b))

export const findQueryIndex = (queries, a) => _.findIndex(queries, b => compareQuery(a, b))

export const findQuery = (queries, a) => {
  const idx = findQueryIndex(queries, a);

  if (idx !== -1) {
    return queries[idx];
  } else {
    return null;
  }

}

export const findQueryParams = (queries, {queryid, variables}) => {

  for (const currQuery of queries) {

    let matchParams = true;
    if (variables && currQuery.variables) {
      for (const pkey in variables) {
        if (variables[pkey] !== currQuery.variables[pkey]) {
          matchParams = false;
          break;
        }
      }

      for (const pkey in currQuery.variables) {
        if (variables[pkey] !== currQuery.variables[pkey]) {
          matchParams = false;
          break;
        }
      }
    }

    if (matchParams && queryid === currQuery.queryid) {
      return currQuery;
    }

  }
  return null;
}

export const handleQueryResult = (data, result) => {
  const {loading, error, refetch} = data;
  if (loading)
    return <div className="d-block text-center p-4" >
      <h2>
        <i className="fa fa-spinner fa-spin"></i>
      </h2>
    </div>;
  if (error)
    return `Error!: ${error}`;

  return result(data);
}

export const QueryNoDataRefetch = lifecycle({
  shouldComponentUpdate({data}) {
    if (data && !data.loading && !data.error && !data.data.viewer) {
      data.refetch()
      return false
    }

    return true
  }
});
