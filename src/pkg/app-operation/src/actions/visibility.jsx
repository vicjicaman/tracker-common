import React from "react";
import _ from 'lodash'
import {Query, Mutation, ApolloConsumer} from "react-apollo";
import gql from "graphql-tag";
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {GeneralFragment, Query as OperationsQuery} from '../queries'

export const ChangeVisibilityMutation = gql `
mutation OperationVisibility ($config: JSON!, $operationid: String!, $type: String!){
viewer (config: $config) {
    system {
      operations {
        operation (operationid: $operationid){
          visibility (type:$type) {
            ...OperationGeneralFragment
          }
        }
      }
    }
  }
}
${GeneralFragment}`;

const getOperation = ({
  viewer: {
    system: {
      operations: {
        operation
      }
    }
  }
}) => operation

export const ChangeVisibility = ({type, operationid, onClick}) => (<Mutation mutation={ChangeVisibilityMutation} onCompleted={() => {}} onDone={() => {}} onError={(cache, res) => {}}>
  {
    (mutationHandler, {data, loading, error}) => {

      return (<i style={{
          position: "absolute",
          top: 0,
          right: 0
        }} className={'fa fa-times'} onClick={(e) => {
          //closeToast();
          onClick && onClick(e)

          mutationHandler({
            variables: {
              operationid,
              type,
              config:{}
            },
            update: (store, {data: mutationData}) => {
              /*const operation = getOperation(mutationData);

              if (operation === null) {
                const data = store.readQuery({query: OperationsQuery});
                const idx = _.findIndex(data.viewer.system.operations.list, {operationid})

                if (idx !== -1) {
                  store.query({fetchPolicy: "network-only", query: OperationsQuery}).then(function(value) {}).catch(e => {});
                }

              }
*/
            }
          });
        }}></i>);
    }
  }
</Mutation>)
