import React from "react";
import gql from "graphql-tag";
import {OperationAction} from './OperationAction';
import {fragments as OperationFragments} from '../queries'

const OPERATION_MUTATION = gql `
  mutation stopOperation($operationid: String!)
  {
    viewer {
      local {
        operation (operationid: $operationid){
          stop {
            id
            ...OperationGeneral
          }
        }
      }
    }
  }
  ${OperationFragments.general}
`;

export const Stop = ({operation, updateOperations}) => {

  const mutProps = {
    updateOperations,
    className: "btn-secondary",
    Label: () => (<i className="fa fa-stop"></i>),
    mutation: OPERATION_MUTATION,
    operation,
    path: ({operation}) => {
      return {
        stop: {
          __typename: "Operation",
          ...operation,
          status: "stop",
          id: operation.operationid
        }
      };
    }
  }

  return (<OperationAction {...mutProps}/>);
};
