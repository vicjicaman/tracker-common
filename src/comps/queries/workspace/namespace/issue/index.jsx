import gql from 'graphql-tag';

export const NamespaceIssueFragment = gql `
  fragment NamespaceIssueFragment on NamespaceIssue {
    id
    issueid
    subject
    description
    author
    created
    status
    labels {
      id
      labelid
      type
    }
    entity {
      branch {
        remote
      }
    }
  }
`;
