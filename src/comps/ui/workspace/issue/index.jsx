import React from "react";
import * as ChangesUI from 'UI/toolbox/system/changes'
import * as IssueUI from 'UI/toolbox/namespace/issue'
import * as Routes from 'Routes/workspaces/issues'
import * as CommentUI from './comment'
import * as LabelUI from './label'
import * as LabelActions from 'Actions/workspace/namespace/issue/label'

export const LabelGroup = () => (<span><IssueUI.Icon/>{' '}Issues</span>)
export const LinkGroup = ({workspace: {
    workspaceid
  }}) => (<Link to={Routes.issues({workspaceid})}><LabelGroup/></Link>)

export const Label = IssueUI.Label;
export const Link = ({workspace: {
    workspaceid
  }, issue: {
    issueid
  }}) => (<IssueUI.Link issueid={issueid} route={Routes.issue({workspaceid, issueid})}/>)

export const Header = ({
  workspace,
  issue,
  link = true,
  layout,
  workspace: {
    workspaceid
  },
  issue: {
    issueid
  },
  readonly = true
}) => (<IssueUI.Header remove={readonly !== true
    ? ({label}) => (<LabelActions.Remove label={label} workspace={workspace} issue={issue}/>)
    : null} layout={layout} workspace={workspace} issue={issue} route={link
    ? Routes.issue({workspaceid, issueid})
    : null}/>)

export const Changes = ({changes, level, children}) => {
  return <ChangesUI.Entity entity="issue" changes={changes} level={level} label={({entityid: issueid, change, content}) => {

      const {path, filemeta} = change;

      const subject = (filemeta && filemeta[path])
        ? filemeta[path].subject
        : !content
          ? issueid
          : content.current
            ? content.current.subject
            : content.previous.subject;

      return (<Label subject={subject.trunc(50)}/>);
    }}>
    {
      ({parentid: issueid, changes, level}) => (<React.Fragment>
        <CommentUI.Changes issueid={issueid} changes={changes.comments} level={level}/>
        <LabelUI.Changes issueid={issueid} changes={changes.labels} level={level}/>
      </React.Fragment>)
    }
  </ChangesUI.Entity>;
}
