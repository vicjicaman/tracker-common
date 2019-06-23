import React from "react";
import _ from 'lodash'
import {Query, Mutation, ApolloConsumer} from "react-apollo";
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {EventConnector} from '../../app-event/src'
import {QueryConnector, getQueryRefetcher, findQueryParams, isFragment} from '../../app-query/src'
import {Query as OperationsQuery} from './queries'
//import {OperationContext} from './context'
import {notify, close} from '@nebulario/tracker-notify'
import {HandleListeners} from './listener'
import {Link} from 'react-router-dom';
import * as Routes from './routes'
import * as Actions from './actions'
import {OperationConnector} from './state/connector'

//let operationTimeoutRefetch = null;
//const refetchOps = (client) => {
//if (operationTimeoutRefetch === null) {
//operationTimeoutRefetch = setTimeout(() => {
//  client.query({fetchPolicy: "network-only", query: OperationsQuery});
//operationTimeoutRefetch = null;
//}, 500);
//}
//}

const handleOperationCommands = function(comp) {

  const {
    commandsHandleEvent, commandsStream,
    /* client, */
    list,
    updateOperation
  } = comp.props;

  if (commandsStream) {
    let refreshOps = false
    for (const evtf of commandsStream.events) {
      const {eventid, event, payload: {
          operationid
        }} = evtf;

      HandleListeners(operationid, evtf);

      if (event === "operation.update") {
        updateOperation(evtf.payload);
        commandsHandleEvent(eventid);
      }
    }
  }
}

const handleQueryPrefetch = function(comp) {

  const {
    QueryRefetched,
    PrefetchQuery,
    RefetchQueryStart,
    operationList: list,
    updateOperation,
    queriesToRefetch
  } = comp.props;

  //console.log("OPERATIONS=======================================================>");
  //console.log(list)

  for (const op of list) {
    const {operationid, config: {
        mutationid
      }, status} = op;

    if (status === "finish" || status === "error") {
      updateOperation({
        ...op,
        status: "handled"
      });
    }

    if (status !== "handled") {
      const refetcher = getQueryRefetcher(mutationid);
      if (refetcher) {
        const refetchQueries = refetcher.refetch(op);

        for (const query of refetchQueries) {

          const mountedQuery = findQueryParams(queriesToRefetch, query);

          if (mountedQuery !== null || isFragment(query.queryid)) {

            if (status === "running" && (mountedQuery === null || mountedQuery.status !== "prefetch")) {
              PrefetchQuery(query)
            }

            if (status === "finish" && (mountedQuery === null || mountedQuery.status !== "started")) {
              RefetchQueryStart(query);
            }

            if (status === "error" && (mountedQuery === null || mountedQuery.status !== "refetched")) {
              QueryRefetched(query);
            }
          }

        }

      }
    }

  }
}

const ProviderComp = compose(
/**/
OperationConnector,
/**/
QueryConnector,
/***/
withStateHandlers(({}) => ({notifications: []}), {
  updateErrorsNotifications: (state, {operationList: list}) => () => {
    const {notifications} = state;

    const changes = []
    for (const operation of list) {
      const {operationid, message, visibility} = operation;
      const idx = _.findIndex(notifications, {operationid});

      if (idx === -1 && visibility === "notify") {
        changes.push({action: "open", operationid, message});
      }

      if (idx !== -1) {
        if (visibility !== "notify" || visibility === "hidden") {
          changes.push({action: "close", operationid});
        }
      }

    }

    if (changes.length === 0) {
      return state;
    }

    const currNotifs = [...notifications];

    for (const change of changes) {
      const {action, operationid, message} = change;

      if (action === "open") {
        const toastid = notify({
          message: (<div className={"mt-1"}>
            <span className="small">
              {
                message
                  ? message.messageid
                  : "UNKNOWN ERROR"
              }
            </span><br/> {message && <pre className="small text-white">{JSON.stringify(message.values, null, 2)}</pre>}
            <Link to={Routes.operation({operationid})}>
              <i className={"fa fa-search-plus text-white"}>{' '}details</i>
            </Link>
          </div>), type: "error", autoClose: false, closeButton: <Actions.ChangeVisibility operationid={operationid} type={"shown"}></Actions.ChangeVisibility>
        });

        currNotifs.push({operationid, toastid});

      }

      if (action === "close") {
        const idx = _.findIndex(currNotifs, {operationid});
        if (idx !== -1) {
          const {toastid} = currNotifs[idx];
          close(toastid);
          currNotifs.splice(idx, 1);
        }

      }

    }

    return {notifications: currNotifs}
  }
}),

/**/
lifecycle({
  /**/
  componentDidMount() {
    const {initList, initOperations} = this.props;
    initOperations(initList);
    const {updateErrorsNotifications} = this.props;
    updateErrorsNotifications();
    handleOperationCommands(this);
    handleQueryPrefetch(this);
  },
  /**/
  componentDidUpdate(prevProps) {
    const {updateErrorsNotifications, operationList: list} = this.props;
    updateErrorsNotifications();
    handleOperationCommands(this);
    handleQueryPrefetch(this);

  }
})
/**/)(({children, initList}) => <div>{children}</div>);
/*
<OperationContext.Provider value={initList}>
  {children}
</OperationContext.Provider>
*/

export const PureComp = ({children, commandsHandleEvent, commandsStream}) => {
  return (<Query query={OperationsQuery}>
    {
      ({loading, error, data}) => {
        if (loading)
          return <span>...</span>;
        if (error)
          return `Error!!: ${error}`;

        const {
          viewer: {
            system: {
              operations: {
                list: initList
              }
            }
          }
        } = data;

        const propsProv = {
          initList,
          commandsHandleEvent,
          commandsStream/*,
          client*/
        };

        return <ProviderComp {...propsProv}>
          {children}</ProviderComp>
      }
    }
  </Query>)
}

const Comp = compose(
/**/
EventConnector({
  name: "commands",
  stream: () => ["commands"]
})
/**/)(PureComp);

const ClientComp = (props) => {
  //client={client}
  return <Comp {...props}></Comp>
  /*return (<ApolloConsumer>
    {
      client => {
        return <Comp {...props} client={client}></Comp>
      }
    }</ApolloConsumer>);*/
}

export {
  ClientComp as OperationManager
}
