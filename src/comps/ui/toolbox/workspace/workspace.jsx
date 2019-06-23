import React from "react";
import * as ItemUI from 'UI/toolbox/system/item'
import {Link as RouteLink} from 'react-router-dom';
import {hide} from 'Utils/hide'

export const Icon = () => (<i className="fa fa-globe"/>)

export const Label = ({workspaceid}) => <span><Icon/>{' '}{workspaceid}</span>
export const Link = ({route, workspaceid}) => <RouteLink to={route}><Label workspaceid={workspaceid}/></RouteLink>

export const Header = (props) => {
  const {
    workspace: {
      workspaceid,
      url
    },
    route,
    layout,
    children
  } = props;

  const label = <Label workspaceid={workspaceid}/>;
  const link = <Link workspaceid={workspaceid} route={route}/>;

  return (<ItemUI.Header label={label} link={link} route={route}>
    {
      layout !== "short" && (<div className="small">
        url:{' '}{hide(url)}
      </div>)
    }
    {children}
  </ItemUI.Header>);
}
