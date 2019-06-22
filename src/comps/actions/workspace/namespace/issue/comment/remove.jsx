import React from "react";
import gql from "graphql-tag";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetchIssue} from '../refetch';

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueCommentRemove ($config: JSON!,  $workspaceid: String!, $issueid: String!, $commentid: String!){
  viewer (config:$config) {
      workspaces {
        workspace (workspaceid:$workspaceid) {
          namespace {
            issues {
              issue (issueid:$issueid){
                comments {
                  comment(commentid :$commentid) {
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

export const Remove = ({componentid, workspace: {
    workspaceid
  }, issue: {
    issueid
  }, comment: {
    commentid
  }, onLoadingQueries}) => {

  const propsOperation = {
    componentid: componentid + "_operation_" + commentid,
    className: "btn-danger",
    label: <i className="fa fa-times">{' '}Remove</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            namespace: {
              issues: {
                issue: {
                  comments: {
                    comment: {
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
      commentid
    }
  }

  const propsModal = {
    componentid: componentid + "_modal_" + commentid,
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid, issueid}),
    OperationButton: ({className, onClick}) => {

      const propsForm = {
        className: className + " " + propsOperation.className,
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    className: "btn-link text-danger small",
    label: <i className="fa fa-times"></i>,
    header: <span>Remove comment</span>,
    content: <div className="alert alert-warning" role="alert">
        <i className="fa fa-exclamation-triangle"></i>{' '}
        The comment will be deleted from the filesystem, but it will always be present on previous commits.
      </div>

  }
  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>

}
