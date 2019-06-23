import React from "react";
import _ from 'lodash';

export const Status = ({status}) => {

  let type = "info";
  if (status === "A") {
    type = "success";
  }
  if (status === "M") {
    type = "warning";
  }
  if (status === "D") {
    type = "danger";
  }

  return (<span className={"small badge mr-1 badge-pill badge-" + type}>
    {status}
  </span>);
}

export const File = ({file}) => {
  const {id, fileid, status} = file;
  return (<span>
    <small>
      <Status status={status}/> {fileid}
    </small>
  </span>);
}
