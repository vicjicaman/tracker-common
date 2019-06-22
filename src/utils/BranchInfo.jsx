import React from "react";
import _ from 'lodash'
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {LoadingButton} from '../app-ui/src';
import {Commit} from './Commit';

export const getShortHash = (s) => s.substring(0, 7)
export const PureComp = ({info}) => {

  const {summary, local, remote, base} = info;

  const types = {
    local
  };

  if (remote) {
    types.remote = remote;
  }

  if (base) {
    types.base = base;
  }

  const byCommit = _.reduce(types, (res, v, k) => {

    const h = v.hash;

    if (!res[h]) {
      res[h] = {
        ...v,
        labels: []
      }
    }

    res[h].labels.push(k);
    return res;
  }, {});

  return _.keys(byCommit).map((v, i) => {
    const commit = byCommit[v];
    return <React.Fragment key={i}>
      {
        commit.labels.map((v, il) => <small key={il} className="text-muted">
          <i className="fa fa-angle-double-right"></i>{_.capitalize(v)}{' '}</small>)
      }
      <p>
        <Commit commit={commit}></Commit>
      </p>
    </React.Fragment>
  });
}

const Comp = compose()(PureComp);
export {
  Comp as BranchInfo
};
