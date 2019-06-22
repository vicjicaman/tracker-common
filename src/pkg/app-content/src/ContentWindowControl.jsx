import React from "react";
import _ from "lodash";
import {centerContent} from './utils'
import {DropMenu} from '../../app-ui/src';

export const ContentWindowControl = ({componentid, setWindowMode, mode}) => {
  const options = [];
  let icon = "cog";

  if (mode !== "minimized") {
    icon = "window-minimize";
    options.push(<a key="minimized" href="#" onClick={(e) => {
        e.preventDefault();
        setWindowMode("minimized");
        centerContent(componentid);

      }} className="dropdown-item">
      <i className="fa fa-window-minimize"></i>{' '}Minimize
    </a>);
  }

  if (mode !== "restored") {
    icon = "window-restore";
    options.push(<a key="restored" href="#" onClick={(e) => {
        e.preventDefault();
        setWindowMode("restored");
        centerContent(componentid);
      }} className="dropdown-item ">
      <i className="fa fa-window-restore"></i>{' '}Restore
    </a>);
  }

  if (mode !== "maximized") {
    options.push(<a key="maximized" href="#" onClick={(e) => {
        e.preventDefault();
        setWindowMode("maximized");
        centerContent(componentid);
      }} className="dropdown-item">
      <i className="fa fa-window-maximize"></i>{' '}Maximize
    </a>);
  }

  if (mode === "minimized") {
    icon = "window-minimize";
  }
  if (mode === "restored") {
    icon = "window-restore";
  }
  if (mode === "maximized") {
    icon = "window-maximize";
  }

  return <DropMenu mode={mode} componentid={componentid}>{options}</DropMenu>;
}
// Turn the device

// Check the device is now overload by the communucation device
// Check the device
