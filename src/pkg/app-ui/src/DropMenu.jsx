import React from "react";

export const DropMenu = ({
  componentid,
  children,
  icon,
  className = "btn-link",
  label,
  float = "float-right",
  onClick,
  onMouseOver
}) => {
  return <div className={"btn-group " + float} role="group">
    <button id={componentid} type="button" onClick={onClick} onMouseOver={onMouseOver} className={"btn dropdown-toggle btn-xs " + className} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {
        icon &&< i className = {
          "fa fa-" + icon
        } />
      }{
        (label && label !== "")
          ? <span>{' '}{label}</span>
          : ""
      }
    </button>
    <div className="dropdown-menu dropdown-menu-right" aria-labelledby={componentid}>
      {children}
    </div>
  </div>
}
