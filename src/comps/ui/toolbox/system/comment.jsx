import React from "react";
import _ from 'lodash'
import * as ItemUI from 'UI/toolbox/system/item'
import * as EntityUI from 'UI/toolbox/system/entity'
import {RelativeDate} from 'PKG/app-ui/src'
import {hide as hideInfo} from 'Utils/hide'

export const Icon = () => (<i className="fa fa-comment"/>)
export const Label = ({comment, author}) => (<span><Icon/>{' '}{comment}{' '}<small>by{' '}{author}</small>
</span>);

// ({labelid}) => (<LabelActions.Remove componentid={componentid + "_label_remove"} namespaceid={namespaceid} issueid={issueid} labelid={labelid}/>)
export const Comment = (props) => {
  const {
    comment: {
      commentid,
      comment,
      created,
      author,
      entity
    },

    close,
    remove,
    children
  } = props;

  const label = (<span>
    <span className="d-block">
      <small><Icon/>{' '}{hideInfo(author)}:{' '}</small><EntityUI.Labels entity={entity}/></span>
  </span>);

  return (<ItemUI.Header label={label}>
    <span className={"small float-right"}><RelativeDate date={created}/></span>
    <pre className="d-block">
{comment}
</pre>
    {children}
  </ItemUI.Header>);
}
