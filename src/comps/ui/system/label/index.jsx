import React from "react";
import * as ChangesUI from 'UI/toolbox/system/changes'
import * as LabelUI from 'UI/toolbox/system/label'

export const Label = LabelUI.Label;

export const Changes = ({changes, level, children}) => {
  return <ChangesUI.Entity entity="label" changes={changes} level={level} label={({entityid: labelid, content, state}) => {

      const type = !content
        ? ""
        : content.current
          ? content.current.type
          : content.previous.type;

      return (<Label removed={state==="D"} labelid={labelid} type={type}/>);
    }}></ChangesUI.Entity>;
}
