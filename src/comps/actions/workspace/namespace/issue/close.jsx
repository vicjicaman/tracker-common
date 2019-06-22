import React from "react";
import gql from "graphql-tag";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetch} from './refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation NamespaceIssueClose ($config: JSON!,  $namespaceid: String!, $issueid: String!, $state: String!){
  viewer (config:$config) {
      namespaces {
        namespace (namespaceid:$namespaceid) {
          repository {
            issues {
              issue (issueid:$issueid){
                status (state:$state)  {
                  ...OperationGeneralFragment
                }
              }
            }
          }
        }
      }
    }
  }
${OperationQueries.GeneralFragment}`, inp => [...refetch(inp)]);

export const Close = (props) => {
  const {componentid, namespaceid, issueid} = props;

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-danger",
    label: <i className="fa fa-window-close "></i>,
    getOperation: ({
      viewer: {
        namespaces: {
          namespace: {
            repository: {
              issues: {
                issue: {
                  status: operation
                }
              }
            }
          }
        }
      }
    }) => operation,
    mutation,
    variables: {
      namespaceid,
      issueid,
      state: "close"
    }
  }

  const propsModal = {
    componentid: componentid + "_modal",
    OperationButton: ({className, onClick}) => {

      const propsForm = {
        className: className + " " + propsOperation.className,
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    className: "btn-link text-danger p-0",
    label: <i className="fa fa-times"></i>,
    header: <span>Close issue</span>,
    content: <div className="alert alert-warning" role="alert">
        <i className="fa fa-exclamation-triangle"></i>{' '}
        The issue will not be deleted from the filesystem, the issue will be ignored by changing the status field to "close" on it's issue.json file.
      </div>

  }
  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>

}
