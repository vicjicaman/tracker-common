import React from "react";
import _ from 'lodash'
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {Query} from '@nebulario/tracker-app-query'
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

export const WorkspaceIssues = ({workspace, workspace: {
      workspaceid
    }}) => {

    const componentid = "workspaceid_" + workspaceid + "_issues";
    return(<Query queryid={"WorkspaceIssuesQuery"} variables={{
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
    </Query>);
  }
