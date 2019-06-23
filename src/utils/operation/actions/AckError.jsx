import React from "react";
import gql from "graphql-tag";
import {OperationAction} from './OperationAction';
import {fragments as OperationFragments} from '../queries'

const OPERATION_MUTATION = gql `
  mutation ackErrorOperation($operationid: String!)
  {
    viewer {
      local {
        operation (operationid: $operationid){
          ackError {
            id
            ...OperationGeneral
          }
        }
      }
    }
  }
  ${OperationFragments.general}
`;

export const AckError = ({operation}) => {

  const mutProps = {
    className: "btn-secondary",
    Label: () => (<i className="fa fa-times"></i>),
    mutation: OPERATION_MUTATION,
    operation,
    path: ({operation}) => {
      return {
        ackError: {
          __typename: "Operation",
          ...operation,
          status: "failed",
          id: operation.operationid
        }
      };
    }
  }

  return (<OperationAction {...mutProps}/>);
};
