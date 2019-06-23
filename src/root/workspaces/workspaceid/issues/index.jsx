import React from "react";
import {Switch, Route} from 'react-router-dom';

import * as Issue from './issueid'
import * as Routes from 'Routes/workspaces/issues'

const getIssue = ({issueid}) => ({issueid})

export const Content = ({workspace, Header}) => {

  return (<Switch>

    <Route path={Routes.issue()} render={({
        match: {
          params: {
            issueid
          }
        }
      }) => (<Issue.Content workspace={workspace} Header={Header} issue={getIssue({issueid})}/>)}/>

  </Switch>);
}

export const Indice = ({workspace}) => (<React.Fragment>

  <Route path={Routes.issue()} render={({
      match: {
        params: {
          issueid
        }
      }
    }) => (<Issue.Indice workspace={workspace} issue={getIssue({issueid})}/>)}/>

</React.Fragment>);
