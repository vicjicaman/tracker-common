import React from "react";
import _ from "lodash";

const setItemsMode = ({controlComponentId, items, setComponentWindowMode, mode}) => {
  for (const itm of items) {
    setComponentWindowMode({
      componentid: controlComponentId + "_item_" + itm.id,
      mode
    });
  }
}

export const MainWindowControl = (props) => {
  const options = [];

  options.push(<a key="minimized" href="#" onClick={(e) => {
      e.preventDefault();
      setItemsMode({
        ...props,
        mode: "minimized"
      })
    }} className="dropdown-item">
    <i className="fa fa-window-minimize"></i>{' '}Minimize
  </a>);

  options.push(<a key="restored" href="#" onClick={(e) => {
      e.preventDefault();
      setItemsMode({
        ...props,
        mode: "restored"
      })
    }} className="dropdown-item ">
    <i className="fa fa-window-restore"></i>{' '}Restore
  </a>);

  options.push(<a key="splited" href="#" onClick={(e) => {
      e.preventDefault();
      setItemsMode({
        ...props,
        mode: "splited"
      })
    }} className="dropdown-item ">
    <i className="fa fa-pause"></i>{' '}Split
  </a>);

  options.push(<a key="maximized" href="#" onClick={(e) => {
      e.preventDefault();
      setItemsMode({
        ...props,
        mode: "maximized"
      })

    }} className="dropdown-item">
    <i className="fa fa-window-maximize"></i>{' '}Maximize
  </a>);

  return options;
}
