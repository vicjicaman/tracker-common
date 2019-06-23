import React from "react";
import gql from "graphql-tag";
import {OperationButton} from 'PKG/app-operation/src'

export const Reset = (props) => {
  const {componentid, mutation, getOperation, onLoadingQueries, variables} = props;

  const label = <i className="fa fa-undo"></i>;
  const className = "btn-link text-danger m-0 p-0";

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
