import React from "react";
import {Button, Popover, PopoverHeader, PopoverBody, UncontrolledCollapse} from 'reactstrap';
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {Hash} from './Hash';
import {hide as hideInfo} from 'Utils/hide'

const CommitInfo = ({commit, title, changes: Changes}) => {

  const {
    commitid,
    message,
    files,
    remote,
    type,
    author,
    parents
  } = commit;
  const isMerge = (type === "merge");

  return (<React.Fragment>
    <span>{title}{' '}<Hash hash={commitid}/>
      <small>{' '}{hideInfo(author)}</small>
      {' '}{isMerge && (<span className={"small badge mr-1 badge-pill badge-warning"}><i className="fa fa-code-fork"/></span>)}
      {' '}{remote === false && (<i className="fa fa-upload text-warning"/>)}</span>
    {
      (Changes && files)
        ? <Changes files={files.list}/>
        : <pre>{hideInfo(message)}</pre>
    }
  </React.Fragment>);
}

export const Commit = ({componentid, commit, title, changes}) => {

  if (!commit) {
    return null;
  } else {

    const {
      id,
      commitid,
      files,
      remote,
      type,
      parents
    } = commit;
    const isMerge = (type === "merge");
    const refsid = (componentid + "_" + commitid).safeId() + "_refs";

    return (<React.Fragment>
      <CommitInfo commit={commit} title={title} changes={changes}/> {
        isMerge && (<div>
          <div className="d-block">
            <a id={refsid}>
              <i className="fa fa-angle-down"></i>{' '}Merge parents
            </a>
          </div>
          <UncontrolledCollapse toggler={'#' + refsid}>
            {
              _.map(parents, parent => <CommitInfo commit={{
                  ...parent,
                  remote: true
                }} title={<b> parent</b>} changes={changes}/>)
            }
          </UncontrolledCollapse>
        </div>)
      }

    </React.Fragment>);
  }
};
