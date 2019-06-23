import React from "react";
import * as RepositoryUI from 'UI/toolbox/repository'
import path from 'path'

/// <small><RepositoryUI.Files.Status status={state}/></small>

export const Entity = ({entity, changes, level, label: Label, children: Children}) => {
  const res = [];

  if (!changes) {
    return null;
  }

  const sublevel = level + 3;
  for (const entityid in changes.sub) {
    const change = changes.sub[entityid];

    let state = null;
    let content = null;
    if (change.sub[entity + ".json"]) {
      state = change.sub[entity + ".json"].file.status;
      content = change.sub[entity + ".json"].file.content;
    }

    let iconClass = "";
    let diffStyle = {};
    if (state === "A") {
      iconClass = "text-success";
    }
    if (state === "M") {
      iconClass = "text-warning";
    }
    if (state === "D") {
      iconClass = "text-danger";
      diffStyle = {
        textDecoration: "line-through"
      };
    }

    res.push(<div className={"d-block"} style={diffStyle}>
      <small><RepositoryUI.Files.Status status={state}/></small><Label state={state} iconClass={iconClass} style={diffStyle} entityid={entityid} change={change} content={content}/>
      <div className={"d-block"} style={{
          marginLeft: (sublevel * 2) + "px"
        }}>
        {Children && <Children parentid={entityid} level={sublevel} changes={change.sub}></Children>}
      </div>
    </div>);

  }
  return res;
}

// Elon mosk -> Joe regan

export const groupChanges = (files) => {
  const res = {
    path: "",
    sub: {}
  }
  for (const file of files) {
    const {fileid, staged, status, content, filemeta} = file;

    const comps = fileid.split("/");

    let contentCurrent = null;
    let contentPrevious = null;
    let current = res;
    for (const comp of comps) {
      if (!current.sub[comp]) {
        current.sub[comp] = {
          filemeta,
          leaf: false,
          path: path.join(current.path, comp),
          sub: {}
        };
      }
      current = current.sub[comp];
    }

    if (content.current) {
      try {
        contentCurrent = JSON.parse(content.current)
      } catch (e) {
        console.log("ENTITY_CURRENT_PARSE_ERROR: " + fileid);
      }
    }

    if (content.previous) {
      try {
        contentPrevious = JSON.parse(content.previous)
      } catch (e) {
        console.log("ENTITY_PREVIOUS_PARSE_ERROR: " + fileid);
      }
    }

    current.file = {
      fileid,
      status: status || staged,
      content: {
        current: contentCurrent,
        previous: contentPrevious
      }
    };
  }

  return res;
}
