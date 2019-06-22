import React from "react";
import _ from 'lodash';

export const Icon = () => (<i className="fa fa-tag"/>)
export const Label = ({removed, labelid, type, remove: Remove}) => {
  const diffStyle = removed
    ? {
      textDecoration: "line-through"
    }
    : {};
  return (<span style={diffStyle} className={"small badge mr-1 badge-pill badge-" + type}>
    <Icon/>{' '}{labelid}{' '}
    {
      Remove && (<Remove label={{
          labelid,
          type
        }}/>)
    }
  </span>);
}
export const LabelGroup = ({labels, remove}) => _.map(labels, (lbl, i) => (<Label remove={remove} key={i} {...lbl}/>))
