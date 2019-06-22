export const refetch = (inp) => {
  const {data: {
      workspaceid
    }} = inp;
  return [
    {
      queryid: "WorkspaceRepositoryQuery",
      variables: {
        workspaceid
      }
    }
  ];
}
