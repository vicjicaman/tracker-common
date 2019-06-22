import React from "react";
import {compose} from 'recompose'
import {NavLink, Link, Switch, Route} from 'react-router-dom';
import * as Routes from 'Routes/workspaces'

import * as Home from './home'
import * as Issues from './issues'

import {Header} from './header'

export const Content = ({workspace}) => {

  const routeProps = {
    workspace,
    Header
  };

  return (<Switch>
    <Route exact={true} path={Routes.workspace()} render={() => (<Home.Content {...routeProps}/>)}/>
    <Route path={Routes.issues()} render={() => (<Issues.Content {...routeProps}/>)}/>

  </Switch>);

}

export const Indice = ({workspace}) => {

  const routeProps = {
    workspace
  };

  return (<React.Fragment>
    <Route path={Routes.workspace()} render={() => (<Home.Indice {...routeProps}/>)}/>
    <Route path={Routes.issues()} render={() => (<Issues.Indice {...routeProps}/>)}/>
  </React.Fragment>)

};
