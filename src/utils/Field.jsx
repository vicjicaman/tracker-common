import React from "react";
import {compose, lifecycle, withStateHandlers} from 'recompose';

export const PureComp = ({label, value}) => (<span className="d-block" style={{
    lineHeight: "1em"
  }}>
  <small className="text-muted">
    {label}{' '}<i className="fa fa-angle-double-right"></i>
  </small>
  <span className="d-block pl-2">
    {value}
  </span>

</span>);

const Comp = compose()(PureComp);
export {
  Comp as Field
};

export const PureCompLine = ({label, value}) => (<span className="d-block">

  <small className="text-muted">{label}{' '}<i className="fa fa-angle-double-right"></i>
  </small>
  <span className="d-inline ml-2">
    {value}
  </span>
</span>);

const CompLine = compose()(PureCompLine);
export {
  CompLine as FieldLine
};
