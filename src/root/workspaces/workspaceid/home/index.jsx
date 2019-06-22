import React from "react";
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {Content as ContentComp} from 'PKG/app-content/src'
import {WorkspaceCommits} from './commits'
import * as WorkspaceUI from 'UI/workspace'

/* , */
export const Content = ({workspace, workspace: {
    workspaceid
  }, Header}) => {

  const componentid = "workspaceid_" + workspaceid + "_home";
  return (<React.Fragment>

    <Header workspace={workspace}></Header>
    <div className="row">
      <ContentComp componentid={componentid} window={false} contentClass="col-12 col-lg-12 mt-1 mb-2" sections={[
          {
            sectionid: "commits",
            label: () => (<span>
              <i className="fa  fa-clock-o"></i>{' '}History</span>),
            content: () => (<WorkspaceCommits workspace={workspace}/>)
          }
        ]}></ContentComp>
    </div>
  </React.Fragment>);

}

export const Indice = ({workspace}) => (<React.Fragment>

  <li className="breadcrumb-item">
    <WorkspaceUI.Link workspace={workspace}/>
  </li>

</React.Fragment>)
