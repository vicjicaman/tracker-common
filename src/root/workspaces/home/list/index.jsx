import React from "react";
import {compose} from 'recompose';;
import {Link} from 'react-router-dom';
import {Query} from '@nebulario/tracker-app-query'
import * as WorkspaceActions from 'Actions/workspace'

import {Summary} from './summary'
import {List} from './list'

export const onLoadingQueries = () => [
  {
    queryid: "RootWorkspacesQuery"
  }
];

const getList = ({
  viewer: {
    workspaces: {
      list
    }
  }
}) => list

export const WorkspacesList = ({}) => (<Query refetcher={(data) => {

    const list = getList(data);

    return _.map(list, m => ({
      queryid: "RootWorkspaceQuery",
      variables: {
        workspaceid: m.workspaceid
      }
    }))

  }} queryid={"RootWorkspacesQuery"}>
  {
    ({loading, error, data}) => {

      const list = getList(data);

      return (<div className="mr-3 ml-3">
        <div className="row pt-4">
          <div className="col-12 col-md-6">
            <WorkspaceActions.Create/>
          </div>
          <div className="col-12 col-md-6">
            <Summary workspaces={list}></Summary>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <List workspaces={list} onLoadingQueries={onLoadingQueries}></List>
          </div>
        </div>
      </div>);
    }
  }
</Query>);
