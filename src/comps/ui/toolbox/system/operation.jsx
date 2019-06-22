import React from "react";
import _ from 'lodash'
import * as ItemUI from 'UI/toolbox/system/item'
import {Link} from 'react-router-dom';

export const Icon = () => (<i className="fa fa-cog"/>)

export const Status = ({status}) => {
  let className = "";

  if (status === "running") {
    className = "badge badge-success";
  }

  if (status === "finish") {
    className = "badge badge-primary";
  }

  if (status === "error") {
    className = "badge badge-danger";
  }
  return (<span className={className}>{status}</span>);
}

export const Header = (props) => {
  const {
    operation: {
      operationid,
      config: {
        mutationid
      },
      status
    },
    route,
    children
  } = props;

  const label = <span><Icon/>{' '}{mutationid}</span>;

  return (<ItemUI.Header label={label} route={route}>
    <div className="small d-block">
      operationid:{' '}{operationid}
    </div>
    <div className="small d-block">
      status:{' '}<Status status={status}></Status>
    </div>
    {children}
  </ItemUI.Header>);
}
