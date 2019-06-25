import React from "react";
import _ from "lodash";
import {AlertIcon, InfoIcon} from '@nebulario/tracker-app-ui'
import {Commit} from '../Commit'
import * as FileUtils from '../utils'
import {MergeSummary} from './merge'

/* merging,
files, */
export const BranchSummary = ({
  componentid,
  repository,
  branch,
  actions,
  changes,
  modal,
  auto,
  constrainBranchReset
}) => {

  const {
    branchid,
    summary: {
      status,
      merge,
      current,
      remote: remoteCommit,
      base
    },
    commits
  } = branch;

  const group = _.reduce({
    current,
    remote: remoteCommit,
    base
  }, (res, v, k) => {

    if (!v) {
      return res;
    }

    const {commitid} = v;

    const idx = _.findIndex(res, {commitid})
    if (idx === -1) {
      res.push({
        commitid,
        ...v,
        labels: [k]
      });
    } else {
      res[idx].labels.push(k);
    }

    return res;
  }, []);

  let label = "";

  if (status === "DIVERGED") {
    label = <span className="text-danger">DIVERGED</span>
  }
  if (status === "UP_TO_DATE") {
    label = <span className="text-success">Up to date</span>
  }
  if (status === "NEED_PULL") {
    label = <span className="text-warning">Need merge</span>
  }
  if (status === "NEED_PUSH") {
    label = <span className="text-warning">Need push</span>
  }
  if (status === "NO_COMMITS") {
    label = <span className="text-warning">Without branch commits</span>
  }

  const renderStatus = <div className="small">
    <span className="d-block">Branch{' '}<b>{branchid}</b>
    </span>
    <span className="d-block">status:{' '}<b>{label}</b>
    </span>
  </div>;

  let allowReset = true;
  if (constrainBranchReset) {
    allowReset = commits.list.length > 0;
  }

  return (<div>
    {renderStatus}

    {
      _.map(group, commit => <div>
        <hr/>
        <div>
          {((commit.labels.length === 1 && commit.labels[0] === "current" && allowReset) && actions) && actions.reset}{' '}<Commit componentid={componentid + "_" + commit.labels.join("/")} commit={commit} title={(<span className="text-muted small">{commit.labels.join("/")}</span>)} changes={changes}/>
        </div>

      </div>)
    }

    <div>
      {merge && <MergeSummary componentid={componentid + "_merge_summary"} repository={repository} merge={merge} modal={modal} auto={auto}/>}
    </div>

  </div>);

}

/*

const needCommit = (merging === null) && (files.length > 0) && (status === "DIVERGED" || status === "NEED_PULL");
{
  needCommit && (<div className="alert alert-warning" role="alert">
    <AlertIcon/>{' '}Your module needs to merge with remote changes, you need to commit or stash the changes of the module.
  </div>)
}

const unmerged = FileUtils.checkFiles(merge, FileUtils.isFileUnmerge);
const needMergeConflict = (merging === null) && (unmerged) && (status === "DIVERGED" || status === "NEED_PULL");
const needMergeNoConflict = (merging === null) && (!unmerged) && (status === "DIVERGED" || status === "NEED_PULL");


{
  needMergeConflict && (<div className="alert alert-warning" role="alert">
    <AlertIcon/>{' '}You can merge the diverged changes of your module, you need to manually resolve the conflicts.<FilesModal componentid={componentid + "_merge_files"} list={merge} header={<span> Merge files</span>}></FilesModal>
  </div>)
}

{
  needMergeNoConflict && (<div className="alert alert-info" role="alert">
    <InfoIcon/>{' '}There are no conflict on the merging branches, you can merge them directly.
  </div>)
}

*/
