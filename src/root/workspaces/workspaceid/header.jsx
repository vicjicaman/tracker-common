import React from "react";
import {compose} from 'recompose'
import {NavLink, Link, Switch, Route} from 'react-router-dom';
import * as Home from './home'
import * as Routes from 'Routes/workspaces'

import * as WorkspaceUI from 'UI/workspace'
import {Query} from 'PKG/app-query/src'
import {Content as ContentComp} from 'PKG/app-content/src'
import * as RepositoryUI from 'PKG/app-repository/src'
import * as WorkspaceRepositorySyncActions from 'Actions/workspace/repository/sync'
import * as RepositoryToolbox from 'UI/toolbox/repository'

/*
const get = (data) => {
  const workspace = Workspace.get(data);
  if (!workspace) {
    return null;
  }
  const {repository} = workspace;
  return repository;
}
*/

export const onLoadingQueries = ({workspaceid}) => [
  {
    queryid: "WorkspaceRepositoryQuery",
    variables: {
      workspaceid
    }
  }
];

export const Repository = ({header, parentid, repository, actions}) => {
  const componentid = parentid + "_repository";
  const auto = true;
  const footer = () => (<RepositoryToolbox.Footer repository={repository} actions={actions} auto={auto}/>)

  return (<ContentComp componentid={componentid} window={false} contentClass="col-12 col-md-6 col-lg-6" sections={[
      {
        sectionid: "current",
        label: () => <RepositoryToolbox.ChangesLabel repository={repository}/>,
        content: () => <RepositoryToolbox.Changes repository={repository} changes={({files}) => (<WorkspaceUI.Changes files={files}/>)}/>
      }, {
        sectionid: "branch",
        label: () => <RepositoryToolbox.BranchLabel repository={repository}/>,
        content: () => <RepositoryToolbox.Branch repository={repository} actions={actions} changes={({files}) => (<WorkspaceUI.Changes files={files}/>)} auto={auto}/>
      }
    ]} header={header} footer={footer}></ContentComp>);
}

export const Header = ({componentid, workspace, workspace: {
    workspaceid
  }, children}) => {

  return (<Query queryid={"WorkspaceRepositoryQuery"} variables={{
      workspaceid
    }}>
    {
      ({loading, error, data}) => {

        const {
          viewer: {
            workspaces: {
              workspace,
              workspace: {
                id,
                repository
              }
            }
          }
        } = data;

        const actProps = {
          workspace,
          onLoadingQueries
        };

        const componentid = "workspace_header_" + id;
        const header = () => (<WorkspaceUI.Header workspace={workspace}/>);
        const actions = {
          fetch: (<WorkspaceRepositorySyncActions.Fetch componentid={componentid + "_fetch"} {...actProps}/>),
          //merge: (<RepositoryUI.Actions.Sync.Merge operations={[() => ,
          merge: (<WorkspaceRepositorySyncActions.Merge componentid={componentid + "_merge"} {...actProps}/>),
          pull: (<WorkspaceRepositorySyncActions.Pull componentid={componentid + "_pull"} {...actProps}/>),
          push: (<WorkspaceRepositorySyncActions.Push componentid={componentid + "_push"} {...actProps}/>),
          commit: (<WorkspaceRepositorySyncActions.Commit componentid={componentid + "_commit"} {...actProps}/>),
          reset: (<WorkspaceRepositorySyncActions.Reset componentid={componentid + "_reset"} {...actProps}/>)
        }

        return (<div className="row mb-4">
          <Repository header={header} repository={repository} actions={actions}/>
          <div className="col-12 col-md-6">
            <div className="pt-4">
              <ul className="nav nav-pills i">
                <li className="nav-item">
                  <NavLink exact={true} className={"nav-link"} to={Routes.workspace(workspace)}>
                    <i className="fa fa-home"></i>{' '}{workspaceid}</NavLink>
                </li>
              </ul>
            </div>
            {children}
          </div>
        </div>);

      }
    }
    </Query>);

  }
