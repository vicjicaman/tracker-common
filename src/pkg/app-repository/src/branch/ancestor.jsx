import React from "react";
import _ from "lodash";
import {AlertIcon, InfoIcon} from 'PKG/app-ui/src'
import {Commit} from '../Commit'
import {FilesModal} from '../FilesModal'

export const AncestorSummary = ({componentid, merging, branch}) => {

  const {
    branchid,
    baselineid,
    ancestor: {
      status,
      merge,
      common,
      head
    }
  } = branch;

  let label = "";

  if (status === "ANCESTOR_UP_TO_DATE") {
    label = <span className="text-success">Latest baseline head is merged</span>
  }
  if (status === "ANCESTOR_OUT_OF_DATE") {
    label = <span className="text-danger">Need to merge latest head</span>
  }

  if (status === "MERGED_TO_ANCESTOR") {
    label = <span className="text-warning">The branch is already merged on the baseline</span>
  }


  return (<div>
    Ancestor{' '}<b>{baselineid}</b>{' '}to{' '}<b>{branchid}</b>
    <div className="d-block">
      <b>{label}</b>
    </div>

    <div className="mt-2"></div>
  </div>);

}
