import React from "react";
import gql from "graphql-tag";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetch, refetchIssue} from './refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueRemove ($config: JSON!,  $workspaceid: String!, $issueid: String!){
  viewer (config:$config) {
      workspaces {
        workspace (workspaceid:$workspaceid) {
          namespace {
            issues {
              issue (issueid:$issueid){
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
${OperationQueries.GeneralFragment}`, inp => [
  ...refetch(inp),
  ...refetchIssue(inp)
]);

export const Remove = (props) => {
  const {componentid, workspace: {
      workspaceid
    }, issue: {
      issueid
    }, onLoadingQueries} = props;

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-danger",
    label: <i className="fa fa-times">{' '}Remove</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            namespace: {
              issues: {
                issue: {
                  remove: operation
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
      issueid
    }
  }

  const propsModal = {
    componentid: componentid + "_modal",
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid, issueid}),
    OperationButton: ({className, onClick}) => {

      const propsForm = {
        className: className + " " + propsOperation.className,
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    className: "btn-danger",
    label: <i className="fa fa-times">{' '}Remove</i>,
    header: <span>Remove issue</span>,
    content: <div className="alert alert-warning" role="alert">
        <i className="fa fa-exclamation-triangle"></i>{' '}
        The issue will be deleted from the filesystem, you could check it again in previous commits.
      </div>

  }
  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>

}
