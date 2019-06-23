import React from "react";
import _ from "lodash";
import {AlertIcon, InfoIcon} from 'PKG/app-ui/src'
import {Commit} from '../Commit'
import {FilesModal} from '../FilesModal'
import * as FileUtils from '../utils'

export const MergeSummary = ({componentid, repository, merge, modal, auto}) => {
  if (!merge) {
    return;
  }

  const {status, files} = merge;

  const modalComp = modal
    ? <FilesModal componentid={componentid + "_merge_files"} list={files} header={<span> Files to merge</span>}/>
    : null;

  if (status === "CHANGES") {
    return (<div className="alert alert-warning" role="alert">
      <AlertIcon/>{' '}The repository have changes to merge, you need to commit or stash the changes to merge them.
    </div>);
  }

  if (status === "MERGE_DIRECT" || status === "MERGE_INDIRECT") {
    return (<div className="alert alert-info" role="alert">
      <InfoIcon/>{' '}There are no conflicts on the merge, you can merge with a comment or fast-forward the head.{' '}{modalComp}
    </div>);
  }

  if (status === "MERGE_CONFLICT" && auto) {
    return (<div className="alert alert-warning" role="alert">
      <AlertIcon/>{' '}There merge conflicts will be automatically resolved with the remote values.{' '}{modalComp}
    </div>);
  }

  if (status === "MERGE_CONFLICT" && !auto) {
    return (<div className="alert alert-warning" role="alert">
      <AlertIcon/>{' '}You have to manually resolve the merge conflicts, you need to begin the merge process.{' '}{modalComp}
    </div>);
  }

  if (status === "MERGING") {
    return (<div className="alert alert-warning" role="alert">
      <AlertIcon/>{' '}You need to commit you changes to finish the merge process.
    </div>);
  }

  return null;
}
/* merging,
files, */
