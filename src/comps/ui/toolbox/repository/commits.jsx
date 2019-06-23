import React from "react";
import _ from 'lodash';
import {Commit} from 'PKG/app-repository/src'

export const List = ({componentid, type, repository, repository: {
    info
  }}) => {

  if (!info) {
    return null;
  }

  const {
    [type]: {
      commits: {
        list: commits
      }
    }
  } = info;

  let result = null;
  if (commits.length === 0) {
    result = <div className="card-body">
      <div className="card-text">
        No commits
      </div>
    </div>;
  } else {
    result = _.map(commits, commit => {
      return (<li className="p-2 list-group-item"><Commit commit={commit}/></li>);
    })
  }

  return (<ul className="list-group list-group-flush">
    {result}
  </ul>);
}
