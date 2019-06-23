import React from "react";
import * as ChangesUI from 'UI/toolbox/system/changes'
import * as WorkspaceUI from 'UI/toolbox/workspace/workspace'
import * as Routes from 'Routes/workspaces'
import * as IssueUI from './issue'

export const LabelGroup = () => (<span><WorkspaceUI.Icon/>{' '}Workspaces</span>)
export const LinkGroup = () => (<Link to={Routes.workspaces()}><LabelGroup/></Link>)

export const Label = WorkspaceUI.Label;
export const Link = ({workspace: {
    workspaceid
  }}) => (<WorkspaceUI.Link workspaceid={workspaceid} route={Routes.workspace({workspaceid})}/>)

export const Header = ({
  workspace,
  link = true,
  layout,
  workspace: {
    workspaceid
  }
}) => (<WorkspaceUI.Header layout={layout} workspace={workspace} route={link
    ? Routes.workspace({workspaceid})
    : null}/>)

export const Changes = ({files}) => {
  const changes = ChangesUI.groupChanges(files);

  return (<div>
    <IssueUI.Changes changes={changes.sub.issues} level={0}/>
  </div>)
}
