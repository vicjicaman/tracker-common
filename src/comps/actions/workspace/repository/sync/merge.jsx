import React from "react";
import gql from "graphql-tag";
import {OperationButton, Queries, RegisterOperationRefetch} from 'PKG/app-operation/src'
import * as RepositoryUI from 'PKG/app-repository/src'
import {refetch} from '../refetch'

const mutation = RegisterOperationRefetch(gql `
mutation WorkspaceMerge ($config: JSON!, $workspaceid: String!){
  viewer (config:$config) {
    workspaces {
      workspace (workspaceid:$workspaceid) {
        repository {
          merge {
            ...OperationGeneralFragment
          }
        }
      }
    }
  }
}
${Queries.GeneralFragment}`, inp => [...refetch(inp)]);

export const Merge = (props) => {
  const {componentid, workspace: {
      workspaceid
    }, onLoadingQueries} = props;

  const propsOperation = {
    componentid,
    className: "btn-secondary",
    label: <i className="fa fa-bolt">{' '}Merge</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            repository: {
              merge: operation
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

  return <OperationButton {...propsOperation}/>
}
