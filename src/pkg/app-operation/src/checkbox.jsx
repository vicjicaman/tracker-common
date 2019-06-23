import React from "react";
import _ from 'lodash'
import {compose, withStateHandlers, lifecycle, withProps} from "recompose"
import {Mutation, ApolloConsumer} from "react-apollo";
const uuidv4 = require('uuid/v4');

import {Query as OperationsQuery} from './queries'
import {isLocked} from './utils'
import {onEventListener} from './listener'

import {LoadingIcon, LoadingButton} from '../../app-ui/src';
import {QueryContext, findQuery, RegisterQueryRefetch, QueryActionConnector, getQueryRefetcher} from '../../app-query/src';
import {InProgress} from '../../app-query/src'


const PureOperationCheckbox = ({
  componentid,
  style,
  isValid = true,
  locked: isLockedOutter,
  lock,
  variables,
  mutation,
  label,
  className,
  onClick,
  onDone,
  onError,
  getOperation,
  mutationid,
  onLoadingQueries,
  PrefetchQuery,
  check
}) => {

  const loading = (<button disabled={true} className={"btn " + className}>
    <LoadingIcon></LoadingIcon>
  </button>);

  const content = (<Mutation mutation={mutation} onCompleted={(mutationData) => {}} onDone={(data) => {}} onError={(cache, res) => {
      onError && onError(op)
    }}>
    {
      (mutationHandler, {
        data,
        loading: innerLoading,
        error
      }) => {

        return (<input className="m-1" name={componentid} type="checkbox" checked={check} onChange={function(e) {

            const target = e.target;

            const operationid = uuidv4();

            const Prefetchers = getQueryRefetcher(mutationid);

            if (Prefetchers) {
              const {refetch} = Prefetchers;
              if (refetch) {
                const queriesToPre = refetch({data: variables})
                for (const q of queriesToPre) {
                  const {queryid, variables} = q;
                  PrefetchQuery({ queryid, variables});
                }
              }

            }

            mutationHandler({
              variables: { //Test
                ...variables,
                value: target.checked,
                config: {
                  initiatorid: componentid,
                  mutationid,
                  operationid
                }
              },
              update: function(store, {data: mutationData}) {
                const operation = getOperation(mutationData);
                const data = store.readQuery({query: OperationsQuery});
                data.viewer.system.operations.list.push(operation);
                store.writeQuery({query: OperationsQuery, data});
              }
            });
          }}/>);
      }
    }
  </Mutation>);

  if (onLoadingQueries) {
    return (<InProgress onLoadingQueries={onLoadingQueries} loading={loading} content={content}></InProgress>);
  } else {
    return content;
  }
};

export const OperationCheckbox = compose(QueryActionConnector,
/**/
withProps(({mutation}) => ({mutationid: mutation.definitions[0].name.value})),
/**/
lifecycle({
  componentDidMount() {
    const {mutationid} = this.props;
  }
})
/*
withStateHandlers(() => ({operationid: null}), {
  setOperationId: () => (operationid) => ({operationid})
})
/**/)(PureOperationCheckbox); //compose(QueryActionConnector)(PureOperationCheckbox);
