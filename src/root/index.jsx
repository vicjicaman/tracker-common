import React from "react";
import {compose} from 'recompose'
import {Switch, Route} from 'react-router-dom';
import * as Home from './home'
import * as Operations from './operations'
import * as Workspaces from './workspaces'
import * as Routes from 'Routes'
import {Header} from './header'

export const Content = () => {

  const header = <Header></Header>;

  return (<Switch>
    <Route exact={true} path={Routes.home()} render={() => (<Home.Content Header={Header}/>)}/>
    <Route path={Routes.operations()} render={() => (<Operations.Content Header={Header}/>)}/>
    <Route path={Routes.workspaces()} render={() => (<Workspaces.Content Header={Header}/>)}/>
  </Switch>);
}

export const Indice = () => (<React.Fragment>
  <Route path={Routes.home()} render={() => (<Home.Indice/>)}/>
  <Route path={Routes.operations()} render={() => (<Operations.Indice/>)}/>
  <Route path={Routes.workspaces()} render={() => (<Workspaces.Indice/>)}/>
</React.Fragment>);
