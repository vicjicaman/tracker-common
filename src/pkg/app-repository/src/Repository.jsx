import React from "react";
import {AlertIcon, MessageBoard} from '@nebulario/tracker-app-ui'

export const RepositoryLabel = ({
  repository,
  repository: {
    info
  },
  children: Children,
  label = <span><i className="fa fa-code-fork"/>{' '}Repository</span>
}) => {

  if (!info) {
    return (<span>{label}{' '}<AlertIcon/></span>);
  }
  return Children
    ? <Children repository={repository}/>
    : label
};

export const Repository = ({repository, issue, layout, repository: {
    info
  }, children: Children}) => {

  if (!info) {

    if (layout === "short") {
      return (<div className="d-block">Repository{' '}<AlertIcon/></div>);
    }

    const {repositoryid, branchid, baselineid, url, status} = repository;

    let msg = null;

    if (issue) {
      msg = issue;
    } else {
      if (status.startsWith("repository:")) {
        const wrongRepository = status.replace("repository:", "");
        msg = <MessageBoard type="warning" messages={[<span>
            There is no repository.<br/>Clone {' '}<b>{url}</b>{' '}
            <br/>
            into:
            <br/>REPOFLOW_WORKSPACE<b>{wrongRepository}</b>
          </span>
            ]}/>
      }

      if (status.startsWith("branch:")) {
        const wrongBranch = status.replace("branch:", "");
        msg = <MessageBoard type="warning" messages={["The branch for this repository must be " + branchid]}/>
      }
    }

    return (<div className="p-2 small">
      {msg}
      <hr/>
      Expected repository and branches:
      <span className="d-block">branchid:{' '}<b>{branchid}</b>
      </span>
      {
        baselineid && (<span>baselineid:{' '}<b>{baselineid}</b>
        </span>)
      }
      <span className="d-block">url:{' '}<b>{url}</b>
      </span>
    </div>);
  }

  return <Children repository={repository}/>
};
