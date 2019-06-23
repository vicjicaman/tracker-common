import React from "react";
import gql from "graphql-tag";
import {OperationButton} from 'PKG/app-operation/src'

export const Pull = (props) => {
  const {componentid, mutation, getOperation, onLoadingQueries, variables} = props;

  const label = <i className="fa fa-download">{' '}Pull</i>;
  const className = "btn-secondary";

  const propsOperation = {
    componentid,
    className,
    label,
    getOperation,
    mutation,
    variables,
    onLoadingQueries
  }

  return <OperationButton {...propsOperation}></OperationButton>
}
