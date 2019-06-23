import React from "react";
import _ from 'lodash'
import {compose} from 'recompose';
import {Link} from 'react-router-dom';
import {Content as ContentComp} from 'PKG/app-content/src'
import * as Routes from 'Routes/workspaces'
import {WorkspacesList} from './list'

//
export const Content = ({Header}) => {
  return (<React.Fragment>
    <Header/>
    <WorkspacesList/>
  </React.Fragment>);

}

export const Indice = () => (<React.Fragment>

  <li className="breadcrumb-item">
    <Link to={Routes.workspaces()}>workspaces</Link>
  </li>

</React.Fragment>)
