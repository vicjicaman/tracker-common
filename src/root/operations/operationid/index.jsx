import React from "react";
import {Switch, Route, Link} from 'react-router-dom';

import {Operation} from './operation'
import * as Routes from 'Routes/operations'

const Content = ({componentid, operationid}) => (<Operation componentid={componentid + "_" + operationid} operationid={operationid}></Operation>);

const Indice = ({operationid}) => (<li className="breadcrumb-item">
  <Link to={Routes.operation({operationid})}>
    <b>{operationid}</b>
  </Link>
</li>);

export {
  Content,
  Indice
}
