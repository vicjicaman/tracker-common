import gql from 'graphql-tag';
import {RegisterQuery} from 'PKG/app-query/src'
import {Queries as StreamQueries} from 'PKG/app-stream/src'

export const GeneralFragment = gql `
  fragment OperationGeneralFragment on Operation {
    id
    operationid
    status
    visibility
    startedOn
    finishedOn
    data
    config
    message {
      messageid
      values
    }
  }
`;

export const GeneralStreamFragment = gql `
  fragment OperationStreamGeneralFragment on Operation {
    ...OperationGeneralFragment
    stream {
      ...StreamGeneralFragment
    }
  }
  ${GeneralFragment}
  ${StreamQueries.GeneralFragment}
`;

export const OperationQuery = gql `query OperationQuery ($operationid:String!)
{
  viewer {
    id
    system {
      operations {
        operation(operationid:$operationid) {
          ...OperationStreamGeneralFragment
        }
      }
    }
  }
}
${GeneralStreamFragment}
`;


export const Query = gql `query OperationsQuery
{
  viewer {
    id
    system {
      operations {
        list {
          ...OperationGeneralFragment
        }
      }
    }
  }
}
${GeneralFragment}
`;

RegisterQuery(Query);
