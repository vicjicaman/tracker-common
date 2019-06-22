import React from "react";
import {compose} from 'recompose'
import {Link, Switch, Route} from 'react-router-dom';
import * as Home from './home'
import * as Workspace from './workspaceid'
import * as Routes from 'Routes/workspaces'

const getWorkspace = ({workspaceid}) => ({workspaceid})

export const Content = ({Header}) => (<Switch>
  <Route exact={true} path={Routes.workspaces()} render={() => (<Home.Content Header={Header}></Home.Content>)}/>

  <Route path={Routes.workspace()} render={({
      match: {
        params: {
          workspaceid
        }
      }
    }) => (<Workspace.Content workspace={getWorkspace({workspaceid})}/>)}/>

</Switch>);

export const Indice = () => (<React.Fragment>
  <Route path={Routes.workspaces()} render={() => (<Home.Indice/>)}/>
  <Route path={Routes.workspace()} render={({
      match: {
        params: {
          workspaceid
        }
      }
    }) => (<Workspace.Indice workspace={getWorkspace({workspaceid})}/>)}/>
</React.Fragment>);
