import React from "react";
import {Link, Switch, Route} from 'react-router-dom';
import {DropMenu} from 'PKG/app-ui/src'
import * as OperationUI from 'UI/toolbox/system/operation'
import * as Actions from 'Actions/system/operation'
import * as Routes from 'Routes/operations'

export const Header = ({item, item: {
    operationid
  }}) => (<OperationUI.Header operation={item} route={Routes.operation({operationid})}/>)

export const sections = [
  {
    sectionid: "general",
    label: () => <span>General</span>,
    content: ({
      item,
      item: {
        operationid,
        status
      }
    }) => {

      return (<div className="m-1"></div>);
    }

  }
];
