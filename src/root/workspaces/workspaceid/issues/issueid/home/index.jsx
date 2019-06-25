import React from "react";
import _ from 'lodash'
import {compose} from 'recompose';
import {Link, Redirect} from 'react-router-dom';
import {Content as ContentComp} from 'PKG/app-content/src'

import {Query} from '@nebulario/tracker-app-query'
import * as CommentUI from 'UI/workspace/issue/comment'
import * as IssueUI from 'UI/workspace/issue'
import * as IssueActions from 'Actions/workspace/namespace/issue'
import * as LabelActions from 'Actions/workspace/namespace/issue/label'
import * as CommentActions from 'Actions/workspace/namespace/issue/comment'
import * as IssueRoutes from 'Routes/workspaces/issues'

export const onLoadingQueries = ({workspaceid, issueid}) => [
  {
    queryid: "WorkspaceIssueQuery",
    variables: {
      workspaceid,
      issueid
    }
  }
];

/*
{
  status === "active" && (<React.Fragment>
    <IssueActions.Edit componentid={componentid + "_edit"} workspaceid={workspaceid} issueid={issueid} issue={issue}/>

  </React.Fragment>)
}
{status === "close" && (<IssueActions.Remove componentid={componentid + "_remove"} workspaceid={workspaceid} issueid={issueid} issue={issue}/>)}
*/

export const Content = ({workspace, issue, Header}) => {

  const {workspaceid} = workspace;
  const {issueid} = issue;

  const componentid = "workspace_issues_" + workspaceid;
  return (<Query queryid={"WorkspaceIssueQuery"} variables={{
      workspaceid,
      issueid
    }}>
    {
      ({loading, error, data}) => {

        const {
          viewer: {
            workspaces: {
              workspace,
              workspace: {
                namespace: {
                  issues: {
                    issue
                  }
                }
              }
            }
          }
        } = data;

        if (!issue) {
          return <Redirect to={IssueRoutes.issues({workspaceid})}/>;
        }

        const {description} = issue;

        const actProps = {
          workspace,
          issue,
          onLoadingQueries
        };

        return (<React.Fragment>
          <Header componentid={componentid + "_header"} workspace={workspace}></Header>

          <div className="row">
            <ContentComp header={() => (<div className="col-12"><IssueUI.Header readonly={false} workspace={workspace} issue={issue}/></div>)} componentid={componentid + "_sections"} window={false} contentClass="col-12 col-lg-12 mt-1 mb-2" sections={[{
                  sectionid: "issue",
                  label: () => (<span>Issue</span>),
                  content: () => <div className="row  p-3">
                      <div className="col-12">
                        <IssueActions.Edit componentid={componentid + "_edit"} {...actProps}/>
                        <LabelActions.Create componentid={componentid + "_label_create"} {...actProps}/>

                        <div className="btn-group float-right">
                          <IssueActions.Remove componentid={componentid + "_remove"} {...actProps}/>
                        </div>

                        <div className="row p-4">
                          <div className="offset-md-1 col-md-10">

                            <div className="col-12">
                              <pre className="p-2">
                  {description}
                          </pre>
                            </div>
                            <div className="col-12 "></div>
                          </div>
                        </div>
                        <div className="row  p-3">
                          <div className="offset-md-1 col-md-10">
                            <ul className="list-group list-group-flush">
                              {
                                _.map(issue.comments, (comment, i) => (<li className="p-1 list-group-item" key={i}>
                                  <CommentUI.Comment comment={comment}></CommentUI.Comment>
                                  <span className="float-right"><CommentActions.Remove componentid={componentid + "_comment_remove"} {...actProps} comment={comment}/></span>
                                </li>))
                              }
                            </ul>
                          </div>
                        </div>

                        {
                          (issue.status === "active") && (<div className="row mb-4">
                            <div className="col-12 text-center">
                              <CommentActions.Create componentid={componentid + "_comment_create"} {...actProps}/>
                            </div>
                          </div>)
                        }
                      </div>
                    </div>
                }
              ]}></ContentComp>
          </div>
        </React.Fragment>);

      }
    }
  </Query>);

}

// <CommentActions.Create componentid={componentid + "_issue_comment_create"} workspaceid={workspaceid} issueid={issueid}/>
// {() => }

export const Indice = ({workspace: {
    workspaceid
  }, issue: {
    issueid
  }}) => (<React.Fragment>

    <li className="breadcrumb-item">
      <Link to={IssueRoutes.issue({workspaceid, issueid})}>
        <b>{issueid}</b>
      </Link>
    </li>

  </React.Fragment>)
