import React from "react";
import _ from "lodash";
import {AlertIcon, InfoIcon} from '@nebulario/tracker-app-ui'
import * as Utils from '../utils'
import {Commit} from '../Commit'
import {MergeSummary} from './merge'

export const MergeBackSummary = ({
  componentid,
  repository,
  modal,
  auto,
  releasing,
  changes
}) => {

  const {
    info: {
      branch: {
        branchid,
        baselineid,
        mergeback: {
          status,
          merge,
          common,
          head,
          current
        }
      }
    }
  } = repository;

  let label = "";

  if (status === "MERGED") {
    label = <span className="text-success">Merged</span>
  }
  if (status === "PENDING") {
    label = <span className="text-danger">Need merge</span>
  }

  const renderStatus = (<div className="small">
    status:{' '}<b>{label}</b>
  </div>);

  return (<div>
    <span className="d-block">
      Merge {' '}<b>{branchid}</b>{' '}to{' '}<b>{baselineid}</b>
    </span>
    {renderStatus}

    {
      (status === "PENDING" && head.commitid !== common.commitid && releasing) && (<div className="alert alert-warning" role="alert">
        <AlertIcon/>{' '}
        There should not be additional commits on the baseline branch during the iteration or release to prevent conflicts.
      </div>)
    }

    <div>
      <Commit componentid={componentid + "_common"} changes={changes} commit={common} title={(<span className="text-muted small">common</span>)}></Commit>
    </div>

    {
      (status === "PENDING") && <div>
          <Commit componentid={componentid + "_current"} changes={changes} commit={current} title={(<span className="text-muted small">current</span>)}/>
          <Commit componentid={componentid + "_head"} changes={changes} commit={head} title={(<span className="text-muted small">head</span>)}/>
        </div>
    }

    <div>
      {merge && <MergeSummary componentid={componentid + "_merge_summary"} repository={repository} merge={merge} modal={modal} auto={auto}/>}
    </div>

  </div>);

}
