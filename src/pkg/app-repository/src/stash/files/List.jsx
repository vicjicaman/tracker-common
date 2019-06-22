import React from "react";
import _ from 'lodash';
import {File} from './File'

export const List = ({repository: {
    info
  }, stash}) => {

  if (!info) {
    return null;
  }

  const {
    files: {
      list: files
    }
  } = stash;

  let result = null;
  if (files.length === 0) {
    result = <div className="card-body"></div>;
  } else {
    result = _.map(files, file => {
      return (<li className="p-1 list-group-item">
        <File file={file}/>
      </li>);
    })
  }

  return (<ul className="list-group list-group-flush">
    {result}
  </ul>);
}
