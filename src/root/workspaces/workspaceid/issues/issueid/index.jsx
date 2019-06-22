import React from "react";
import {NavLink, Link, Switch, Route} from 'react-router-dom';
import {Content as ContentComp} from 'PKG/app-content/src'
import * as Home from './home'
import * as IssuesRoutes from 'Routes/workspaces/issues'

export const Content = ({issue, Header, workspace}) => {

  return (<Switch>
    <Route exact={true} path={IssuesRoutes.issue()} render={() => (<Home.Content workspace={workspace} issue={issue} Header={Header}/>)}/>
  </Switch>);

}

export const Indice = ({workspace, issue}) => (<React.Fragment>
  <Route path={IssuesRoutes.issue()} render={() => (<Home.Indice workspace={workspace} issue={issue}/>)}/>
</React.Fragment>);
