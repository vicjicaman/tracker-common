import React from "react";
import _ from 'lodash'
import {Commit} from 'PKG/app-repository/src'
import {Link, Switch, Route} from 'react-router-dom';
import * as WorkspaceUI from 'UI/workspace'

export const sections = [
  {
    sectionid: "commits",
    content: (props) => {
      const {attributes: {
          workspace
        }, item: commit} = props;

      return (<div className="p-2">
        <Commit commit={commit} changes={({files}) => (<WorkspaceUI.Changes files={files}/>)}/>
      </div>);
    }

  }
];
