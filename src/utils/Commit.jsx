import React from "react";
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {LoadingButton} from '../app-ui/src';
import {Hash} from './Hash';

export const Commit = ({commit}) => {

  //console.log(JSON.stringify(commit))

  if (!commit) {
    return "No commit"
  } else {
    return (<React.Fragment>
      <Hash hash={commit.hash}></Hash>
      {' '}
      {commit.message}</React.Fragment>);
  }
};
