import gql from 'graphql-tag';
import {Queries} from 'PKG/app-repository/src'

export const NamespaceRepositoryFragment = gql `
  fragment NamespaceRepositoryFragment on Repository {
    id
    repositoryid
    status
    branchid
    baselineid
    url
    info {
      branchid
      url
      files {
        list {
          id
          fileid
          staged
          unstaged
          filemeta
          content {
            current
            previous
          }
        }
      }
      merging {
        commitid
        message
      }
    }
  }

`;

export const NamespaceCommitFragment = gql `
  fragment NamespaceCommitFragment on Commit {
    id
    commitid
    message
    remote
    type
    author
    files {
      list {
        id
        fileid
        status
        filemeta
        content {
          current
          previous
        }
      }
    }
    parents {
      id
      commitid
      message
      remote
      type
      author
      files {
        list {
          id
          fileid
          status
          filemeta
          content {
            current
            previous
          }
        }
      }
    }
  }
`;

export const NamespaceBranchSummaryFragment = gql `
  fragment NamespaceBranchSummaryFragment on BranchSummary {
    status
    merge {
      ...MergeSummaryFragment
    }
    current {
      ...NamespaceCommitFragment
    }
    base {
      ...NamespaceCommitFragment
    }
    remote {
      ...NamespaceCommitFragment
    }
  }
  ${Queries.MergeSummaryFragment}
  ${NamespaceCommitFragment}
`;

export const NamespaceMergeBackSummaryFragment = gql `
  fragment NamespaceMergeBackSummaryFragment on MergeBackSummary {
    status
    merge {
      ...MergeSummaryFragment
    }
    current {
      ...NamespaceCommitFragment
    }
    common {
      ...NamespaceCommitFragment
    }
    head {
      ...NamespaceCommitFragment
    }
  }
  ${Queries.MergeSummaryFragment}
  ${NamespaceCommitFragment}
`;

export const NamespaceAncestorSummaryFragment = gql `
  fragment NamespaceAncestorSummaryFragment on AncestorSummary {
    status
    merge {
      ...MergeSummaryFragment
    }
    current {
      ...NamespaceCommitFragment
    }
    common {
      ...NamespaceCommitFragment
    }
    head {
      ...NamespaceCommitFragment
    }
  }
  ${Queries.MergeSummaryFragment}
  ${NamespaceCommitFragment}
`;
