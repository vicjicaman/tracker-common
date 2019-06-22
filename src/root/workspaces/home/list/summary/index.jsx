import React from "react";
import {SummaryDisplay} from 'PKG/app-ui/src'

export const Summary = ({workspaces}) => {

  return <React.Fragment>

    <div className="row">
      <div className="col-12">

        <SummaryDisplay items={[{
              label: "Workspaces",
              value: workspaces.length
            }
          ]}></SummaryDisplay>
      </div>
    </div>

  </React.Fragment>

}
