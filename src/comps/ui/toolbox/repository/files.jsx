import React from "react";
import _ from 'lodash';
import {Utils as FileUtils} from 'PKG/app-repository/src'

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

export const File = ({
  file,
  actions: {
    stage: StageAction,
    unstage: UnstageAction,
    remove: RemoveAction
  }
}) => {

  const {id, fileid, staged, unstaged} = file;

  const options = [];
  let unstagedColor = "badge-warning";
  let stagedColor = "badge-success";

  if (staged === "?") {
    stagedColor = "badge-secondary";
  }

  if (unstaged === "?") {
    unstagedColor = "badge-secondary";
  }

  if (staged === "D") {
    stagedColor = "badge-danger";
  }

  if (unstaged === "D") {
    unstagedColor = "badge-danger";
  }

  if (StageAction && FileUtils.isFileUnstaged(file)) {
    options.push(<StageAction file={file}/>);
  }

  if (UnstageAction && file.unstaged !== "U" && FileUtils.isFileStaged(file)) {
    options.push(<UnstageAction file={file}/>);
  }

  if (RemoveAction && (file.unstaged === "U" && file.staged === "D") || (file.unstaged === "D" && file.staged === "U")) {
    options.push(RemoveAction);
  }

  let controls = <div className="btn-group btn-group-sm float-right" role="group">
    {options}
  </div>;

  return (<li className="p-1 list-group-item">
    <small>
      <span className={"badge mr-1 badge-pill " + unstagedColor}>{unstaged}</span>
      <span className={"badge mr-1 badge-pill " + stagedColor}>{staged}</span>
      {fileid}
    </small>

    {controls}
  </li>);
}

export const List = ({
  componentid,
  repository: {
    info
  },
  actions = {}
}) => {

  if (!info) {
    return null;
  }

  const {
    files: {
      list: files
    }
  } = info;

  let result = null;
  if (files.length === 0) {
    result = <div className="card-body">
      <div className="card-text">
        No modified files
      </div>
    </div>;
  } else {
    result = _.map(files, file => {
      return (<File file={file} actions={actions}/>);
    })
  }

  return (<ul className="list-group list-group-flush">
    {result}
  </ul>);
}
