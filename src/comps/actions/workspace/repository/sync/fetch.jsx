import React from "react";
import gql from "graphql-tag";
import {Queries, RegisterOperationRefetch} from 'PKG/app-operation/src'
import * as Repository from 'PKG/app-repository/src'
import {refetch} from '../refetch'

const mutation = RegisterOperationRefetch(gql `
mutation WorkspaceFetch ($config: JSON!, $workspaceid: String!){
  viewer (config:$config) {
    workspaces {
      workspace (workspaceid:$workspaceid) {
        repository {
          fetch {
            ...OperationGeneralFragment
          }
        }
      }
    }
  }
}
${Queries.GeneralFragment}`, inp => [...refetch(inp)]);

export const Fetch = (props) => {
  const {componentid, workspace: {
      workspaceid
    }, onLoadingQueries} = props;

  const propsOperation = {
    componentid,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            repository: {
              fetch: operation
            }
          }
        }
      }
    }) => operation,
    mutation,
    variables: {
      workspaceid
    },
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid})
  }

  return <Repository.Actions.Sync.Fetch {...propsOperation}/>
}
