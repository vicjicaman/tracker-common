import React from "react";
import _ from "lodash"
import {List} from 'PKG/app-list/src'
import * as Item from './item'
import * as Menu from './menu'

export const OperationsList = ({operations}) => {

  const propsList = {
    items: operations,
    item: {
      header: Item.Header,
      footer: Item.Footer,
      sections: Item.sections
    },
    menu: {
      isActive: Menu.isActive,
      header: Menu.Header,
      content: Menu.Content
    },
    sort: items => _.sortBy(items, [
      ({startedOn}) => startedOn
    ]).reverse()
  }

  return <List componentid="operations" {...propsList}></List>
}
