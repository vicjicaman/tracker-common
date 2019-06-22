import React from "react";
import {compose} from 'recompose';
import gql from 'graphql-tag';
import {Link, Switch, Route} from 'react-router-dom';
import * as Routes from 'Routes/operations'

import {OperationsSummary} from './summary'
import {OperationsList} from './list'
import {Query} from 'PKG/app-query/src'
import {OperationConnector} from 'PKG/app-operation/src'

const PureComp = ({componentid, operationList: list}) => (<React.Fragment>
  <div className="row">
    <div className="col-12 col-md-6">
      <OperationsSummary operations={list}></OperationsSummary>
    </div>
    <div className="col-12 col-md-6"></div>
  </div>
  <div className="row">
    <div className="col-12">
      <OperationsList operations={list}></OperationsList>
    </div>
  </div>
</React.Fragment>);

const OperationsHome = compose(OperationConnector)(PureComp);

export const Content = ({componentid, Header}) => (<React.Fragment>
  <Header componentid={componentid + "_header"}/>
  <OperationsHome componentid={componentid}></OperationsHome>
</React.Fragment>);

export const Indice = () => (<React.Fragment>

  <li className="breadcrumb-item">
    <Link to={Routes.operations()}>operations</Link>
  </li>

</React.Fragment>)
