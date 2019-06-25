import React from "react";
import _ from 'lodash'
import {compose, lifecycle} from 'recompose';
import {EventConnector} from '@nebulario/tracker-app-events'
import {QueryConnector} from './QueryConnector'

const QUERY_MAP = {};
const QUERY_REFETCH = [];

const handleCommands = function(comp) {

  const {commandsHandleEvent, commandsStream, RefetchQueryStart, refetch, queriesToRefetch} = comp.props;
  if (commandsStream) {

    //console.log("EVENTS===>");
    //console.log(commandsStream.events)
    for (const evtf of commandsStream.events) {

      const {eventid, event, payload} = evtf;

      if (event === "refetch.update") {
        commandsHandleEvent(eventid);
        const {type, params} = payload;

        const toRefetch = [];
        for (const ref of refetch) {
          const refetchQueries = ref(payload);
          if (refetchQueries) {
            for (const qtr of refetchQueries) {
              toRefetch.push(qtr);
            }
          }
        }

        for (const q of toRefetch) {
          const {queryid, variables} = q;
          RefetchQueryStart({queryid, variables});
        }

      }
    }
  }
}

export const isFragment = (queryid) => {
  const qinf = QUERY_MAP[queryid];

  if (qinf && qinf.cnf && qinf.cnf.fragment) {
    return true;
  }

  return false;
}

export const getRegisterQuery = (queryid) => {
  return QUERY_MAP[queryid].query;
}

export const RegisterQueryRefetch = (mutation, refetch, start, update) => {
  const refetcherid = mutation.definitions[0].name.value
  if (_.find(QUERY_REFETCH, {refetcherid})) {
    throw new Error("DUPLICATED_REFETCHER_" + refetcherid);
  }
  QUERY_REFETCH.push({refetcherid, start, update, refetch});
  return mutation;
}

export const getQueryRefetcher = (refetcherid) => {
  return _.find(QUERY_REFETCH, {refetcherid});
}

export const RegisterQuery = (query, cnf) => {
  const key = query.definitions[0].name.value;
  QUERY_MAP[key] = {
    query,
    cnf
  };
  return query;
}

export const PureComp = () => {
  return (<span></span>)
}

const Comp = compose(
/**/
EventConnector({
  name: "commands",
  stream: () => ["commands"]
}),
/**/
QueryConnector,
/**/
lifecycle({
  /**/
  componentDidMount() {
    handleCommands(this);
  },
  /**/
  componentDidUpdate(prevProps) {
    handleCommands(this);
  }
})
/**/)(PureComp);

export {
  Comp as QueryManager
}
