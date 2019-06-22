export const operations = () => "/operations";

export const operation = (params) => operations() + "/" + (
  params
  ? params.operationid
  : ":operationid");
