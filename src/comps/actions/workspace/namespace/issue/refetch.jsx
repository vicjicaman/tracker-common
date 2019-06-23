import * as Root from '../refetch';

export const refetch = (inp) => {

  if (!inp.data) {
    return []
  }

  const {
    data: {
      workspaceid
    }
  } = inp;
  return [
    ...Root.refetch(inp), {
      queryid: "WorkspaceIssuesQuery",
      variables: {
        workspaceid
      }
    }
  ];
}

export const refetchIssue = (inp) => {

  if (!inp.data) {
    return []
  }

  const {
    data: {
      workspaceid,
      issueid
    }
  } = inp;

  return [
    ...Root.refetch(inp), {
      queryid: "WorkspaceIssueQuery",
      variables: {
        workspaceid,
        issueid
      }
    }
  ];
}
