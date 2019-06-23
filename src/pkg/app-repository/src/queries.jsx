import gql from 'graphql-tag';

export const MergeSummaryFragment = gql `
  fragment MergeSummaryFragment on MergeSummary {
    status
    files {
      id
      fileid
      staged
      unstaged
    }
  }
`;

export const CommitFileFragment = gql `
  fragment CommitFileFragment on CommitFile {
    id
    fileid
    status
    content {
      current
      previous
    }
  }
`;

export const StashFileFragment = gql `
  fragment StashFileFragment on StashFile {
    id
    fileid
    status
    content
  }
`;
/*
files {
  list {
    id
    fileid
    status
    content {
      current
      previous
    }
  }
}
*/
export const CommitFragment = gql `
  fragment CommitFragment on Commit {
    id
    commitid
    message
    remote
    type
    author
    parents {
      id
      commitid
      message
      remote
      type
      author
    }
  }
`;

export const StashFragment = gql `
  fragment StashFragment on Stash {
    id
    stashid
    raw
    message
    groupid
    files {
      list {
        ...StashFileFragment
      }
      diffs {
        ...StashFileFragment
      }
    }
  }
  ${StashFileFragment}
`;

export const BranchSummaryFragment = gql `
  fragment BranchSummaryFragment on BranchSummary {
    status
    merge {
      ...MergeSummaryFragment
    }
    current {
      ...CommitFragment
    }
    base {
      ...CommitFragment
    }
    remote {
      ...CommitFragment
    }
  }
  ${MergeSummaryFragment}
  ${CommitFragment}
`;

export const MergeBackSummaryFragment = gql `
  fragment MergeBackSummaryFragment on MergeBackSummary {
    status
    merge {
      ...MergeSummaryFragment
    }
    current {
      ...CommitFragment
    }
    common {
      ...CommitFragment
    }
    head {
      ...CommitFragment
    }
  }
  ${MergeSummaryFragment}
  ${CommitFragment}
`;

export const AncestorSummaryFragment = gql `
  fragment AncestorSummaryFragment on AncestorSummary {
    status
    merge {
      ...MergeSummaryFragment
    }
    current {
      ...CommitFragment
    }
    common {
      ...CommitFragment
    }
    head {
      ...CommitFragment
    }
  }
  ${MergeSummaryFragment}
  ${CommitFragment}
`;
