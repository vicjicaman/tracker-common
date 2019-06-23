import React from "react";
import gql from "graphql-tag";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetch} from './refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation NamespaceRemove ($config: JSON!,  $namespaceid: String!){
  viewer (config:$config) {
      namespaces {
        namespace (namespaceid:$namespaceid) {
          remove  {
            ...OperationGeneralFragment
          }
        }
      }
    }
  }
${OperationQueries.GeneralFragment}`, inp => [...refetch(inp)]);

export const Remove = (props) => {
  const {componentid, namespaceid} = props;

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-danger",
    label: <i className="fa fa-times">{' '}Remove</i>,
    getOperation: ({
      viewer: {
        namespaces: {
          namespace: {
            remove: operation
          }
        }
      }
    }) => operation,
    mutation,
    variables: {
      namespaceid
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
    className: "btn-danger",
    Label: <i className="fa fa-times"></i>,
    Header: <span>Remove namespace</span>,
    content: <div className="alert alert-warning" role="alert">
        <i className="fa fa-exclamation-triangle"></i>{' '}
        The namespace will not be deleted from the filesystem, the namespace will be ignored by changing the status field to "ignore" on it's namespace.json file.
      </div>

  }

  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>
}
