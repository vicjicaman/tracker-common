import React from "react";
import _ from 'lodash';
import {Utils as FileUtils} from 'PKG/app-repository/src'
import * as Files from './files'
import * as Commits from './commits'
import * as RepositoryUI from 'PKG/app-repository/src'
import {AlertIcon} from '@nebulario/tracker-app-ui'

const repositoryIssue = (<span>
  <i className="fa fa-code-fork"></i>{' '}<b className="text-danger">Repository issue</b>{' '}<AlertIcon/>
</span>);

const ChangesLabel = ({repository}) => {

  const lbl = <i className="fa fa-list">{' '}Changes</i>;

  if (!repository) {
    return lbl;
  }

  const {info} = repository;

  if (!info) {
    return repositoryIssue;
  }

  const {
    files: {
      list: files
    }
  } = info;

  return (<span>
    {lbl}{' '}{(files.length > 0) && <AlertIcon/>}
  </span>)

};

const Changes = ({repository, repository: {
    info
  }, changes: Changes, actions}) => {

  if (!info) {
    return repositoryIssue;
  }

  const {
    files: {
      list: files
    }
  } = info;

  return (<div className="col-12 p-2" style={{
      maxHeight: "250px",
      overflowY: "scroll"
    }}>
    {
      files.length === 0
        ? (<span>No changes to the namespace</span>)
        : Changes
          ? <Changes files={files}/>
          : <Files.List repository={repository} actions={actions}/>
    }
  </div>);
}

const BranchLabel = ({repository: {
    info
  }}) => {

  if (!info) {
    return repositoryIssue;
  }

  const {
    branch: {
      branchid,
      summary: {
        status
      }
    }
  } = info;

  return (<span>
    <i className="fa fa-code-fork"></i>{' '}<b>{branchid}</b>{' '}{(status !== "UP_TO_DATE") && <AlertIcon/>}
  </span>);
}

const Branch = ({
  componentid,
  repository,
  repository: {
    info
  },
  changes,
  actions,
  modal,
  auto
}) => {

  if (!info) {
    return repositoryIssue;
  }

  const {merging, branch, files} = info;

  return (<div className="col-12 p-2">
    <RepositoryUI.Branch.BranchSummary componentid={componentid} branch={branch} actions={actions} changes={changes} modal={modal} auto={auto}/>
  </div>);
}

/*
({files}) => (<WorkspaceUI.Changes files={files}/>)
{
  sectionid: "current",
  label: () => {
    return (<span>
      <i className="fa fa-list"></i>{' '}Changes</span>);
  },
  content: () =>
},
*/

const Footer = ({
  componentid,
  repository,
  repository: {
    info
  },
  actions = {},
  onLoadingQueries,
  auto,
  children
}) => {

  if (!info) {
    return null;
  }

  const {
    status,
    files: {
      list: files
    },
    merging,
    branch,
    branch: {
      summary: {
        status: branchStatus,
        merge: mergeSummary
      }
    }
  } = info;
  const {
    abort,
    begin,
    merge,
    fetch,
    pull,
    push,
    commit,
    stage,
    unstage,
    stash
  } = actions;

  //console.log(repository)

  const unmerged = FileUtils.checkFiles(files, FileUtils.isFileUnmerge);
  const staging = FileUtils.checkFiles(files, FileUtils.isFileStaged);
  const unstaging = FileUtils.checkFiles(files, FileUtils.isFileUnstaged);

  const showBegin = !merging && !staging && mergeSummary && (mergeSummary.status === "MERGE_CONFLICT" && !auto);
  const showAbort = merging;

  const showMerge = !staging && mergeSummary && (mergeSummary.status === "MERGE_DIRECT" || mergeSummary.status === "MERGE_INDIRECT" || (mergeSummary.status === "MERGE_CONFLICT" && auto));
  const showCommit = (!merging && staging) || (staging && merging && !unmerged);

  return (<div>
    {children}
    {fetch}
    {(files.length === 0 && merging === null && (branchStatus === "NEED_PULL" || branchStatus === "UP_TO_DATE")) && pull}
    {branchStatus === "NEED_PUSH" && push}
    <div className="float-right">
      {staging && unstage}
      {unstaging && stage}
      {showCommit && commit}
      {showMerge && merge}
      {showBegin && begin}
      {showAbort && abort}
      {(staging || unstaging) && stash}
    </div>
  </div>);
}

export {
  ChangesLabel,
  Changes,
  BranchLabel,
  Branch,
  Footer,
  Files,
  Commits
};
