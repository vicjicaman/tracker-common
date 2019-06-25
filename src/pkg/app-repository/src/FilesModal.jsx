import React from "react";
import _ from 'lodash'
import {Modal} from '@nebulario/tracker-app-modal'

export const PureComp = (props) => {
  const {componentid, className, list} = props;

  const Content = () => (<ul className="list-group list-group-flush">
    {
      _.map(list, (file, i) => {

        let typeStage = "success";
        let typeUnStage = "warning";

        if (file.staged === "D") {
          typeStage = "danger"
        }

        if (file.unstaged === "D") {
          typeUnStage = "danger"
        }

        if (file.staged === "U") {
          typeStage = "info"
        }

        if (file.unstaged === "U") {
          typeUnStage = "info"
        }

        return (<li className="p-1 list-group-item" key={i}>
          <small>
            <span className={"badge mr-1 badge-pill badge-" + typeUnStage}>{file.unstaged}</span>
            <span className={"badge mr-1 badge-pill badge-" + typeStage}>{file.staged}</span>
            {file.fileid}
          </small>
        </li>);

      })
    }
  </ul>)

  return (<Modal componentid={componentid + "_modal"} className={className + " btn-link btn-sm mt-1 mr-1"} Label={() => "view files..."} Header={() => "Files..."} Content={Content}/>);

};

export {
  PureComp as FilesModal
};
