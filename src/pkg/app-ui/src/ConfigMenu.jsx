import React from "react";

export const ConfigMenu = ({id, children, className}) => {

  return <div className={"btn-group btn-group-sm " + className} role="group">
    <button id={id} type="button" className="btn btn-link dropdown-toggle btn-xs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <i className="fa fa-cog"></i>
    </button>
    <div className="dropdown-menu dropdown-menu-right" aria-labelledby={id}>
      {children}
    </div>
  </div>
}
