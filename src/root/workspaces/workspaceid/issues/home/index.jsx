import React from "react";
import _ from 'lodash'
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {Query} from 'PKG/app-query/src'
import {Content as ContentComp} from 'PKG/app-content/src'
import * as WorkspaceIssueActions from 'Actions/workspace/namespace/issue'
import * as WorkspaceRoutes from 'Routes/workspaces'
import {List} from './list'
export const onLoadingQueries = ({workspaceid}) => [
  {
    queryid: "WorkspaceIssuesQuery",
    variables: {
      workspaceid
    }
  }
];

export const Content = ({workspace, workspace: {
    workspaceid
  }, Header}) => {

  const componentid = "workspace_issues_" + workspaceid;

  return (<React.Fragment>
    <Header componentid={componentid + "_header"} workspace={workspace}></Header>
    <div className="row">
      <ContentComp componentid={componentid + "_sections"} window={false} contentClass="col-12 col-lg-12 mt-1 mb-2" sections={[{
            sectionid: "issues",
            label: () => (<span>Issues</span>),
            content: () => (<Query queryid={"WorkspaceIssuesQuery"} variables={{
                workspaceid
              }}>
              {
                ({loading, error, data}) => {

                  const {
                    viewer: {
                      workspaces: {
                        workspace: {
                          namespace: {
                            issues: {
                              list
                            }
                          }
                        }
                      }
                    }
                  } = data;

                  return (<React.Fragment>

                    <div className="row p-3">
                      <div className="col-12 col-md-6">
                        <WorkspaceIssueActions.Create componentid={componentid + "_issue_create"} workspace={workspace} onLoadingQueries={onLoadingQueries}/>
                      </div>
                      <div className="col-12 col-md-6"></div>
                    </div>
                    <div className="row p-3">
                      <div className="col-12 col-md-10 offset-md-1">
                        <List componentid={componentid + "_list"} type="ul" onLoadingQueries={onLoadingQueries} workspace={workspace} list={list}></List>
                      </div>
                    </div>
                  </React.Fragment>)
                }
              }
            </Query>)
          }
        ]}></ContentComp>
    </div>

  </React.Fragment>);
}

export const Indice = ({workspace: {
    workspaceid
  }}) => (<li className="breadcrumb-item">
    <Link to={WorkspaceRoutes.issues({workspaceid})}>issues</Link>
  </li>)
