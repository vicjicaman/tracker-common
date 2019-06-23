import React from "react";
import {compose, lifecycle, withStateHandlers} from 'recompose';

const PureComp = ({items}) => {

  let ld = 3;
  if (items.length === 1) {
    ld = 12;
  }
  if (items.length === 2) {
    ld = 6;
  }
  if (items.length === 3) {
    ld = 3;
  }



  return (<div className="container-fluid">
    <div className="row">
      {
        _.map(items, ({
          label,
          value
        }, k) => {

          return (<div key={k} className={"col-" + ld + " mb-3"}>
            <div className="card-text text-center">
              <small className="text-muted d-block">{label}</small>
              <span className="d-block">{value}</span>
            </div>
          </div>);

        })
      }
    </div>
  </div>)

}

const Comp = compose()(PureComp);
export {
  Comp as SummaryDisplay
};
