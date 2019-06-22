import gql from 'graphql-tag';

export const WorkspaceFragment = gql `
  fragment WorkspaceFragment on Workspace {
    id
    workspaceid
    url
  }
`;
