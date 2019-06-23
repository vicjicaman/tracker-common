import React from "react";
import * as ChangesUI from 'UI/toolbox/system/changes'
import * as CommentUI from 'UI/toolbox/system/comment'
import {hide as hideInfo} from 'Utils/hide'

export const LabelGroup = () => (<span><CommentUI.Icon/>{' '}Comments</span>)
export const Label = CommentUI.Label;
export const Comment = CommentUI.Comment

export const Changes = ({changes, level, children}) => {
  return <ChangesUI.Entity entity="comment" changes={changes} level={level} label={({entityid: commentid, content}) => {

      const info = content.current
        ? content.current
        : content.previous;

      return (<Label comment={info.comment.trunc(70)} author={hideInfo(info.author)}/>);
    }}></ChangesUI.Entity>;
}
