import React from "react";
import * as OperationUI from 'UI/toolbox/system/operation'

export const Header = ({item}) => (<OperationUI.Header operation={item}/>)
export const Footer = () => (<span></span>)
export const isActive = () => true
