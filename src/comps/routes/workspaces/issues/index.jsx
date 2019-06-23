import {issues as parent} from '..'

export const issues = parent;

export const issue = (params) => issues(params) + "/" + (
  params
  ? params.issueid
  : ":issueid");
