import React from "react";

export const getShortHash = (s) => s.substring(0, 7)
export const Hash = ({hash}) => {

  if (!hash) {
    return "No hash";
  } else {
    return (<span className="text-info">{getShortHash(hash)}{' '}<i className="fa fa-angle-double-right"></i>
    </span>);
  }

};
