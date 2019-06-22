import {operations as parent} from '..'

export const operations = parent;

export const operation = (params) => operations() + "/" + (
  params
  ? params.operationid
  : ":operationid");
