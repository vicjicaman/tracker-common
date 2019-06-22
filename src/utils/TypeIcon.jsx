import React from "react";
import {compose, lifecycle, withStateHandlers} from 'recompose';

export const PureComp = ({type, breaking}) => {

  let cls = "text-warning";
  let icn = "fa-building";

  let bk = " ";

  if(breaking){
    bk = <br/>;
  }

  return (<span className={"text-center " + cls}>
    <i className={"fa " + icn}></i>{bk}
    <b>
      {type}
    </b>
  </span>);
}

const Comp = compose()(PureComp);
export {
  Comp as TypeIcon
};
