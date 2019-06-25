import React from "react";
import _ from 'lodash'
import {compose, withStateHandlers, lifecycle, withProps} from "recompose"
import {Mutation, ApolloConsumer} from "react-apollo";
const uuidv4 = require('uuid/v4');

import {Query as OperationsQuery} from './queries'
import {QueryContext, findQuery, RegisterQueryRefetch, QueryActionConnector, getQueryRefetcher} from '@nebulario/tracker-app-query';
import {InProgress} from '@nebulario/tracker-app-query'

const PureOperationButton = ({
  componentid,
  variables,
  mutation,
  label,
  className,
  onClick,
  onDone,
  onError,
  getOperation,
  mutationid,
  PrefetchQuery,
  children,
  values
}) => {

  return (<Mutation mutation={mutation} onCompleted={(mutationData) => {}} onDone={(data) => {}} onError={(cache, res) => {
      onError && onError(op)
    }}>
    {
      (mutationHandler, {data, error}) => {

        const handler = function(input) {
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
              config: {
                initiatorid: componentid,
                mutationid,
                operationid
              },
              input
            },
            update: function(store, {data: mutationData}) {

              const operation = getOperation(mutationData);
              const data = store.readQuery({query: OperationsQuery});
              data.viewer.system.operations.list.push(operation);
              store.writeQuery({query: OperationsQuery, data});

            }
          });
        }

        const Children = children;
        return <Children componentid={componentid} values={values} handler={handler}></Children>;
      }
    }
  </Mutation>);
};

export const OperationHandler = compose(
/**/
QueryActionConnector,
/**/
withProps(({mutation}) => ({mutationid: mutation.definitions[0].name.value}))
/**/)(PureOperationButton); //compose(QueryActionConnector)(PureOperationButton);
