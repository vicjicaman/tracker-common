import gql from "graphql-tag";

export const EVENTS_QUERY = gql `
    query FeatureEventsQuery {
      events @client {
        id
        event
        module
        data
      }
    }
  `;
