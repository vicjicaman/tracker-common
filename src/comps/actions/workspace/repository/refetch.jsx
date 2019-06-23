import {getGroupChanges} from 'Utils/workspace/changes'

export const refetch = (op) => {

  //console.log("OPERATION FINISHED->REFETCH === "+op.status);
  //console.log(op)

  const {data: {
      workspaceid
    }} = op;

  const queries = [
    {
      queryid: "WorkspaceRepositoryQuery",
      variables: {
        workspaceid
      }
    }, {
      queryid: "WorkspaceRepositoryCommitsQuery",
      variables: {
        workspaceid
      }
    }, {
      queryid: "WorkspaceIssuesQuery",
      variables: {
        workspaceid
      }
    }
  ];

  if (op.status === "finish" && op.result && op.result.files) {

    const files = [
      ...op.result.files,
      ...op.result.parents[0]
    ];
    const changes = getGroupChanges(files);

    for (const type in changes) {
      if (type === "issues") {
        const issues = changes[type];
        for (const issueid in issues) {
          const issue = issues[issueid];
          for (const info in issue) {
            if (info === "issue.json") {
              const entity = issue[info];

              if (entity.file.status === "M") {

                queries.push({
                  queryid: "WorkspaceIssueQuery",
                  variables: {
                    workspaceid,
                    issueid
                  }
                })
              } else {
                queries.push({queryid: "WorkspaceIssuesQuery", variables: {
                    workspaceid
                  }})
              }
            }
          }
        }
      }
    }
  }

  return queries;
}
