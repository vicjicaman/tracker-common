import React from "react";
import _ from "lodash"
import {QueryContext} from './context'
import {findQueryParams} from './utils'

export const queriesInProgress = (queries, toCheckQueries) => {
  for (const query of toCheckQueries) {
    if (queryInProgress(queries, query)) {
      return true;
    }
  }
}

export const queryInProgress = (queries, query) => {
  const found = findQueryParams(queries, query);
  if (found) {
    if (found.status === "prefetch" || found.status === "started" || found.status === "refetching") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const InProgress = (props) => {
  const {loading, content, onLoadingQueries} = props;

  return (<QueryContext.Consumer>
    {
      queries => {

        if (onLoadingQueries) {
          if (queriesInProgress(queries, onLoadingQueries)) {
            return loading;
          }
        }

        return content;

      }
    }
  </QueryContext.Consumer>);
}
