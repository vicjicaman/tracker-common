import gql from 'graphql-tag';

export const RepositoryFragment = gql `
  fragment RepositoryFragment on Repository {
    id
    repositoryid
    branchid
    url
    baselineid
    status
    info {
      branchid
      url
      files {
        list {
          id
          fileid
          staged
          unstaged
        }
      }
      merging {
        commitid
        message
      }
    }
  }

`;
