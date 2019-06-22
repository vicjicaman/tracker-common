import React from "react";
import _ from 'lodash'

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

          return (<div key={k} className={"col-" + ld + " mt-2 mb-2"}>
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

export {
  PureComp as SummaryDisplay
};
