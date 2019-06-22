import React, {Component} from 'react';
import {LoadingIcon} from './LoadingIcon'

const PureComponent = ({
  componentid,
  style,
  disabled,
  loading,
  onClick,
  children,
  className
}) => {

  let content = children;

  if (loading) {
    content = <LoadingIcon/>;
  }

  return (<button style={style} disabled={loading || disabled} id={componentid} onClick={(e) => {
      e.preventDefault();
      if (loading !== true) {
        onClick(e);
      }
    }} type="button" className={"btn " + className}>
    {content}
  </button>)
}

export {
  PureComponent as LoadingButton
};
