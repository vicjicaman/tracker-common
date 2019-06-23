import React from "react";
import gql from "graphql-tag";
import {OperationButton, Queries as OperationQueries, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetchIssue} from '../refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueLabelRemove ($config: JSON!,  $workspaceid: String!, $issueid: String!, $labelid: String!){
  viewer (config:$config) {
      workspaces {
        workspace (workspaceid:$workspaceid) {
          namespace {
            issues {
              issue (issueid:$issueid){
                labels {
                  label(labelid :$labelid) {
                    remove  {
                      ...OperationGeneralFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
${OperationQueries.GeneralFragment}`, inp => [...refetchIssue(inp)]);

export const Remove = (props) => {
  const {componentid, workspace: {
      workspaceid
    }, issue: {
      issueid
    }, label: {
      labelid
    }, onLoadingQueries} = props;

  const label = <i className="fa fa-times"></i>;
  const className = "btn-link text-light p-0 small";

  const propsOperation = {
    componentid,
    lock: null,
    className,
    margin: false,
    label,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            namespace: {
              issues: {
                issue: {
                  labels: {
                    label: {
                      remove: operation
                    }
                  }
                }
              }
            }
          }
        }
      }
    }) => operation,
    mutation,
    variables: {
      workspaceid,
      issueid,
      labelid
    },
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid})
  }

  return <OperationButton {...propsOperation}></OperationButton>
}
