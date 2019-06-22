import gql from 'graphql-tag';
import {Queries as OperationQueries} from 'PKG/app-operation/src'
import {Queries as StreamQueries} from 'PKG/app-stream/src'

export const GeneralFragment = gql `
  fragment ExecutionGeneralFragment on Execution {
    operations {
      ...OperationGeneralFragment
    }
    stream {
      ...StreamGeneralFragment
    }
  }
  ${OperationQueries.GeneralFragment}
  ${StreamQueries.GeneralFragment}
`;
