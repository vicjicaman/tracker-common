import React from "react";
import {SummaryDisplay} from '@nebulario/tracker-app-ui'

export const OperationsSummary = ({operations}) => {

  return <React.Fragment>

    <div className="row">
      <div className="col-12">

        <SummaryDisplay items={[{
              label: "Operations",
              value: operations.length
            }
          ]}></SummaryDisplay>
      </div>
    </div>

    <div className="row">
      <div className="col-12"></div>
    </div>
  </React.Fragment>

}
