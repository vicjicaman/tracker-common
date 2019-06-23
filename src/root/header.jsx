import React from "react";
import {NavLink, Link} from 'react-router-dom';
import * as Routes from 'Routes'

import * as WorkspaceUI from 'UI/workspace'
import * as OperationUI from 'UI/system/operation'

export const Header = () => (<div className="row mb-4">
  <div className="col-12 col-md-6">
    <div className="alert alert-info" role="alert">
      <i className="fa fa-info-circle"></i>{' '}
      Welcome! this is a simple issue tracker tool that use git as a data store.
    </div>
  </div>
  <div className="col-12 col-md-6 pt-4 ">
    <ul className="nav nav-pills">
      <li className="nav-item">
        <NavLink exact={true} className={"nav-link"} to={Routes.home()}>
          <i className="fa fa-home"></i>{' '}Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={"nav-link"} to={Routes.workspaces()}>
          <WorkspaceUI.LabelGroup/>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className={"nav-link"} to={Routes.operations()}>
          <OperationUI.LabelGroup/>
        </NavLink>
      </li>
    </ul>
  </div>
</div>);
