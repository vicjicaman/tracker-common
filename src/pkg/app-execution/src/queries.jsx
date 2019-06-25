import gql from 'graphql-tag';
import {Queries as OperationQueries} from 'PKG/app-operation/src'
import {Queries as StreamQueries} from '@nebulario/tracker-app-stream'

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
