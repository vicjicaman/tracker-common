import React from "react";
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {Query} from 'PKG/app-query/src'
import {List} from './list'

export const WorkspaceCommits = ({workspace, workspace: {
    workspaceid
  }}) => {

  return (<Query queryid={"WorkspaceRepositoryCommitsQuery"} variables={{
      workspaceid
    }}>
    {
      ({loading, error, data}) => {

        const {
          viewer: {
            workspaces: {
              workspace: {
                repository: {
                  info: {
                    branch: {
                      commits: {
                        list
                      }
                    }
                  }
                }
              }
            }
          }
        } = data;

        const componentid = workspace.id + "_commits";
        return (<React.Fragment>
          <div className="row p-3">
            <div className="col-12 col-md-10 offset-md-1">
              <List componentid={componentid} type="ul" workspace={workspace} list={list}></List>
            </div>
          </div>
        </React.Fragment>);

      }
    }
  </Query>);
}
