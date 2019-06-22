import gql from "graphql-tag";

export const fragments = {
  general: gql `
      fragment OperationGeneral on Operation {
          operationid
          operation
          status
          events {
            eventid
            event
            payload
          }
      }
    `
};
