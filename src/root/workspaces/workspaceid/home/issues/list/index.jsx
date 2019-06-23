import React from "react";
import {List as ListComp} from 'PKG/app-list/src'
import * as Item from './item'

export const List = ({componentid, list, workspace, onLoadingQueries}) => {

  const propsList = {
    items: list,
    attributes: {
      workspace
    },
    type: "ul",
    item: {
      sections: Item.sections,
      onLoadingQueries: ({
        attributes: {
          workspace: {
            workspaceid
          }
        },
        item: {
          issueid
        }
      }) => onLoadingQueries({workspaceid, issueid})
    }/*,
    filters: [
      {
        filterid: "closed",
        type: "checkbox",
        label: (<span>Hide closed</span>),
        active: true,
        filter: ({item: {
            status
          }}) => {
          return status !== "close";
        }
      }
    ]*/
  }

  return <ListComp componentid={componentid} {...propsList}></ListComp>
}
