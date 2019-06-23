import React, {Component} from 'react';

const PureComponent = ({loading}) => {

  let display = "none";
  if (loading) {
    display = "inline"
  }

  return <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 10,
      backgroundColor: "black",
      opacity: 0.5,
      cursor: "wait",
      display
    }}></div>;
}

export {
  PureComponent as LoadingOverlay
};
