import React from "react";
import {Stash} from './Stash';

export const List = ({repository, repository: {
    info
  }, actions, group}) => {

  if (!info) {
    return null;
  }

  const {stash: {
      list
    }} = info;

  let result = null;
  if (list.length === 0) {
    result = <div className="card-body">
      <div className="text-center d-block">No stash to list</div>
    </div>;
  } else {
    result = _.map(list, stash => {
      return (<li className="p-1 list-group-item">
        <Stash repository={repository} stash={stash} actions={actions} group={group}/>
      </li>);
    })
  }

  return (<ul className="list-group list-group-flush">
    {result}
  </ul>);
}
