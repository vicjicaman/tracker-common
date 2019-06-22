import React from "react";
import * as WorkspaceUI from 'UI/workspace'

export const Header = ({item: workspace}) => (<WorkspaceUI.Header layout="short" link={false} workspace={workspace}/>)
export const Content = () => (<span></span>)
export const isActive = () => true
