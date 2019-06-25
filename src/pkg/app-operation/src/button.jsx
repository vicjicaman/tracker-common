import React from "react";
import _ from 'lodash'
import {compose, withStateHandlers, lifecycle, withProps} from "recompose"
import {Mutation, ApolloConsumer} from "react-apollo";
const uuidv4 = require('uuid/v4');

import {Query as OperationsQuery} from './queries'
import {isLocked} from './utils'
import {onEventListener} from './listener'

import {LoadingIcon, LoadingButton} from '../../app-ui/src';
import {
  RegisterQueryRefetch,
  QueryConnector,
  getQueryRefetcher,
  InProgress,
  findQueryParams,
  isFragment
} from '@nebulario/tracker-app-query';

export const RegisterOperationRefetch = (mutation, refetch) => RegisterQueryRefetch(mutation, refetch, function(refetcherid, evt) {

  if (evt.event !== 'operation.update') {
    return null;
  }

  const {event, payload: operation} = evt;

  if (refetcherid === operation.config.mutationid && operation.status === "finish") {
    const refetchs = refetch(operation)

    return refetchs;
  }

});

const PureOperationButton = ({
  componentid,
  style,
  isValid = true,
  variables,
  mutation,
  margin = true,
  label,
  className,
  onClick,
  onCompleted,
  onError,
  getOperation,
  mutationid,
  onLoadingQueries,
  PrefetchQuery,
  queriesToRefetch,
  size = "btn-sm"
}) => {

  const loading = (<button disabled={true} className={"btn mt-1 mr-1 " + size + " " + className}>
    <LoadingIcon></LoadingIcon>
  </button>);

  const content = (<Mutation mutation={mutation} onError={(cache, res) => {
      onError && onError(op)
    }}>
    {
      (mutationHandler, {
        data,
        loading: innerLoading,
        error
      }) => {

        return (<LoadingButton componentid={componentid} style={style} onClick={function(e) {

            if (isValid !== true) {
              onClick && onClick(e)
              return;
            }

            const operationid = uuidv4();

            const Prefetchers = getQueryRefetcher(mutationid);

            if (Prefetchers) {
              const {refetch} = Prefetchers;
              if (refetch) {
                const queriesToPre = refetch({data: variables})
                for (const q of queriesToPre) {
                  const {queryid, variables, type} = q;
                  const mountedQuery = findQueryParams(queriesToRefetch, q);
                  if ((mountedQuery !== null && mountedQuery.status !== "prefetch") || isFragment(queryid)) {
                    PrefetchQuery({queryid, variables});
                  }
                }
              }

            }

            mutationHandler({
              variables: { //Test
                ...variables,
                config: {
                  initiatorid: componentid,
                  mutationid,
                  operationid
                }
              },
              update: function(store, {data: mutationData}) {
                //console.log(data)   Testing th evice

                const operation = getOperation(mutationData);

                // get mutationid, check if pending refetch, set state for pending refetch
                // Mutation!
                //  - config => wait for [Queries]
                //  - waiting

                // Query manager
                // - Mutation waitng or finished
                // - Trigger refetch for Queries
                // - Query ends => Operation gets updated to completed/finished => Update remote and retrive list

                const data = store.readQuery({query: OperationsQuery});
                data.viewer.system.operations.list.push(operation);
                store.writeQuery({query: OperationsQuery, data});

                onCompleted && onCompleted(operation);
                //console.log(JSON.stringify())
                //setOperationId(operation.operationid)

              }
            });

            onClick && onClick(e)
          }} className={size + " " + className + (
            margin
            ? " mt-1 mr-1 "
            : "")}>
          {label}
        </LoadingButton>);
      }
    }
  </Mutation>);

  if (onLoadingQueries) {
    return (<InProgress onLoadingQueries={onLoadingQueries} loading={loading} content={content}></InProgress>);
  } else {
    return content;
  }
};

export const OperationButton = compose(QueryConnector,
withProps(({mutation}) => ({mutationid: mutation.definitions[0].name.value}))
)(PureOperationButton); //compose(QueryActionConnector)(PureOperationButton);
