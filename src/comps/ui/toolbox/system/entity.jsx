import React from "react";

export const Labels = ({entity}) => (<span>{!entity.branch.remote && (<i className="text-warning fa fa-upload"/>)}</span>)
