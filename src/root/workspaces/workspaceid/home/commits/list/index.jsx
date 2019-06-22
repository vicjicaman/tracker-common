import React from "react";
import {List as ListComp} from 'PKG/app-list/src'
import * as Item from './item'

export const List = ({componentid, list, workspace}) => {
  const {workspaceid} = workspace;

  const propsList = {
    items: list,
    attributes: {
      workspace
    },
    type: "ul",
    item: {
      sections: Item.sections
    }
  }

  return <ListComp componentid={componentid} {...propsList}></ListComp>
}
