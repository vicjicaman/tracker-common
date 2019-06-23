import React from "react";
import {List as FileList} from './files'
import {OperationDrop} from 'PKG/app-operation/src'

export const StashConfig = ({componentid, operations, group, onLoadingQueries}) => {

  const dropProps = {
    componentid,
    className: "btn-secondary",
    icon: "cogs",
    label: "",
    onLoadingQueries,
    operations,
    onMouseOver: (e) => {
      if (group.payload.groupid !== null) {
        group.setPayload({groupid: null})
      }

    }
  };

  return (<OperationDrop {...dropProps}/>)
}

export const StashGroupConfig = ({componentid, operations, group, groupid, onLoadingQueries}) => {

  const dropProps = {
    componentid,
    className: "btn-link btn-sm p-0 m-0 text-light",
    icon: "cog",
    label: "",
    onLoadingQueries,
    operations,
    onMouseOver: (e) => {
      if (group.payload.groupid !== groupid) {
        group.setPayload({groupid})
      }

    }
  };

  return (<OperationDrop {...dropProps}/>)
}

export const Icon = () => <i className="fa fa-exchange"/>

export const Stash = ({
  componentid,
  repository,
  stash,
  actions: {
    apply: Apply,
    drop: Drop,
    revert: Revert,
    group: {
      apply: ApplyGroup,
      drop: DropGroup,
      revert: RevertGroup
    }
  },
  group
}) => {

  if (!stash) {
    return null;
  }

  const {
    id,
    stashid,
    message,
    raw,
    groupid,
    files: {
      diffs
    }
  } = stash;

  const ops = [];

  if (Apply && diffs.length > 0) {
    ops.push(() => <Apply stash={stash}/>);
  }
  if (Revert && diffs.length === 0) {
    ops.push(() => <Revert stash={stash}/>);
  }
  if (Drop) {
    ops.push(() => <Drop stash={stash}/>);
  }

  const groupOps = [];

  if (ApplyGroup) {
    groupOps.push(() => <ApplyGroup stash={stash} groupid={groupid}/>);
  }
  if (RevertGroup) {
    groupOps.push(() => <RevertGroup stash={stash} groupid={groupid}/>);
  }
  if (DropGroup) {
    groupOps.push(() => <DropGroup stash={stash} groupid={groupid}/>);
  }

  return (<div className="d-block">

    <div className="d-block">
      <span><Icon/> {' '}<b>{stashid}</b>{' '}{
          groupid && (<span className={"small badge badge-pill badge-" + (
              group.payload.groupid === groupid
              ? "danger"
              : "secondary")}>
            {groupid.substring(0, 8)}{' '}<StashGroupConfig group={group} groupid={groupid} componentid={componentid + "_group_actions"} operations={groupOps}/>
          </span>)
        }{' '}<span className={"small badge badge-pill badge-" + (
      diffs.length === 0
      ? "success"
      : "warning")}>
          {diffs.length}{' '}diffs
        </span>
        <div className="float-right"></div>
      </span>
    </div>

    <pre>{groupid?message: raw}</pre>

    <div className="d-block">
      <FileList repository={repository} stash={stash}/>
      <div className="d-block p-2 text-right">
        <StashConfig componentid={componentid + "_actions"} group={group} operations={ops}/>
      </div>

    </div>
  </div>);
};
