import {workspaces as parent} from '..'

export const workspaces = parent;

export const workspace = (params) => workspaces() + "/" + (
  params
  ? params.workspaceid
  : ":workspaceid");

export const issues = (params) => workspace(params) + "/issues"
