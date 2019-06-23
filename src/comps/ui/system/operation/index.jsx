import React from "react";
import * as OperationUI from 'UI/toolbox/system/operation'
import * as Routes from 'Routes/operations'

export const LabelGroup = () => (<span><OperationUI.Icon/>{' '}Operations</span>)
export const LinkGroup = () => (<Link to={Routes.operations()}><LabelGroup/></Link>)

export const Label = OperationUI.Label;
export const Link = ({operation: {
    operationid
  }}) => (<WorkspaceUI.Link operationid={operationid} route={Routes.operation({operationid})}/>)

export const Header = ({
  operation,
  link = true,
  layout,
  operation: {
    operationid
  }
}) => (<WorkspaceUI.Header layout={layout} operation={operation} route={link
    ? Routes.operation({operationid})
    : null}/>)
