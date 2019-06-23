import React from "react";
import _ from 'lodash'
import * as IssueUI from 'UI/workspace/issue'
import {Link, Switch, Route} from 'react-router-dom';

export const sections = [
  {
    sectionid: "issue",
    content: (props) => {
      const {attributes: {
          workspace
        }, item} = props;

      return (<div className="p-2">
        <IssueUI.Header workspace={workspace} issue={item}/>
      </div>);
    }

  }
];
