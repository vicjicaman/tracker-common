import React from "react";

import _ from 'lodash'
import {Link, Switch, Route} from 'react-router-dom';
import {DropMenu} from 'PKG/app-ui/src'

import * as WorkspaceRoutes from 'Routes/workspaces'
import * as WorkspaceUI from 'UI/workspace'
import * as Actions from 'Actions/workspace'
import {AlertIcon} from 'PKG/app-ui/src'

export const Header = ({item}) => (<WorkspaceUI.Header workspace={item}/>)

export const Footer = ({item: {
    workspaceid
  }}) => {
  // <Actions.Remove workspaceid={workspaceid}></Actions.Remove>
  return (<div className="pull-right"></div>);
}

export const sections = [
  {
    sectionid: "menu",
    label: () => <i className="fa fa-list">{' '}Menu</i>,
    content: (props) => {

      const {
        item: {
          workspaceid,
          namespace
        }
      } = props;

      // Link to issues
      return (<div>

      </div>);
    }
  }
];
