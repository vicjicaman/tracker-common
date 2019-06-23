import React from "react";
import {compose} from 'recompose'
import {Link, Switch, Route} from 'react-router-dom';
import * as Home from './home'
import * as Operation from './operationid'
import * as Routes from 'Routes/operations'

export const Content = ({componentid, Header}) => (<Switch>
  <Route exact={true} path={Routes.operations()} render={() => (<Home.Content componentid={componentid + "_home"} Header={Header}></Home.Content>)}/>
  <Route path={Routes.operation()} render={({
      match: {
        params: {
          operationid
        }
      }
    }) => (<Operation.Content componentid={componentid + "_" + operationid} operationid={operationid}></Operation.Content>)}/>

    </Switch>)

export const Indice = () => (<React.Fragment>
  <Route path={Routes.operations()} render={() => (<Home.Indice/>)}/>
  <Route path={Routes.operation()} render={({
      match: {
        params: {
          operationid
        }
      }
    }) => (<Operation.Indice operationid={operationid}/>)}/>
</React.Fragment>);
