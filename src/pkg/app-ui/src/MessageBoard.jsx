import React from 'react';
import _ from 'lodash'
import {InfoIcon} from './InfoIcon';
import {AlertIcon} from './AlertIcon';

export const MessageBoard = ({type, messages}) => {
  if (messages.length === 0) {
    return null;
  }

  let icon = <InfoIcon/>;

  if (type === "warning") {
    icon = <AlertIcon/>;
  }

  return (<div className={"alert alert-" + type} role="alert">
    {_.map(messages, m => (<span className="d-block">{icon}{' '}{m}</span>))}
  </div>);
}
