import React from "react";
import {List as ListComp} from 'PKG/app-list/src'
import * as Item from './item'
import * as Menu from './menu'

export const List = ({componentid, workspaces, onLoadingQueries}) => {

  const propsList = {
    attributes: {},
    items: workspaces,
    item: {
      header: Item.Header,
      footer: Item.Footer,
      sections: Item.sections,
      onLoadingQueries: ({item: {
          workspaceid
        }}) => onLoadingQueries({workspaceid})
    },
    menu: {
      isActive: Menu.isActive,
      header: Menu.Header,
      content: Menu.Content
    }
  }

  return <ListComp componentid={"workspaces"} {...propsList}></ListComp>
}
