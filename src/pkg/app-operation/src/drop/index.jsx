import React from "react";
import _ from "lodash"
import {compose} from 'recompose';
import {LoadingButton, DropMenu, LoadingIcon} from '@nebulario/tracker-app-ui';
import {InProgress} from '@nebulario/tracker-app-query'

export const PureComp = (props) => {
  const {
    componentid,
    className,
    label,
    operations: buttonOps,
    style,
    icon,
    onClick,
    onLoadingQueries,
    onMouseOver
  } = props;

  const loading = (<button disabled={true} className={"btn btn-sm mr-1 mt-1 " + className}>
    <LoadingIcon></LoadingIcon>
  </button>);

  const content = (<DropMenu onClick={onClick} onMouseOver={onMouseOver} float="" componentid={componentid + "_opdrop"} style={style} className={className+" btn-sm mr-1 mt-1 "} icon={icon} label={label}>
    {_.map(buttonOps, (Operation, i) => <Operation componentid={componentid + "_op_" + i}></Operation>)}
  </DropMenu>);

  return (<InProgress onLoadingQueries={onLoadingQueries} loading={loading} content={content}></InProgress>);

};

const Comp = compose(/**/)(PureComp);
export {
  Comp as OperationDrop
};
