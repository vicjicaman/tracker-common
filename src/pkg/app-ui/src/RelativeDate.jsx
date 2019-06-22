import React from 'react';
import moment from 'moment'

export const RelativeDate = ({date}) => {
  const formated = moment(date).fromNow();
  return (<span>{formated}</span>);
}
