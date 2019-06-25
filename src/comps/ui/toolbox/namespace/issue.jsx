import React from "react";
import _ from 'lodash'
import * as ItemUI from 'UI/toolbox/system/item'
import * as EntityUI from 'UI/toolbox/system/entity'
import * as LabelUI from 'UI/toolbox/system/label'
import {Link as RouteLink} from 'react-router-dom';
import {hide} from 'Utils/hide'
import {RelativeDate} from '@nebulario/tracker-app-ui'

export const Icon = () => (<i className="fa fa-exclamation-circle"/>)
export const Label = ({subject}) => (<span><Icon/>{' '}{subject}</span>);
export const Link = ({route, subject}) => <RouteLink to={route}><Label subject={subject}/></RouteLink>

// ({labelid}) => (<LabelActions.Remove componentid={componentid + "_label_remove"} namespaceid={namespaceid} issueid={issueid} labelid={labelid}/>)
export const Header = (props) => {
  const {
    issue: {
      issueid,
      subject,
      description,
      created,
      status,
      author,
      labels,
      entity
    },
    route,
    remove,
    children
  } = props;

  const link = (<span>
    <span className="d-block">
      <Link route={route} subject={subject}/>{' '}<EntityUI.Labels entity={entity}/>
      <span className={"small float-right"}><RelativeDate date={created}/></span>
    </span>
  </span>);

  const label = (<span>
    <span className="d-block">
      <Label subject={subject}/>{' '}<EntityUI.Labels entity={entity}/>
      <span className={"small float-right"}><RelativeDate date={created}/></span>
    </span>
  </span>);

  return (<ItemUI.Header label={label} route={route} link={link}>

    <span className="d-block">
      <span className="small d-block">
        By: {hide(author)}
      </span>{' '}
      <LabelUI.LabelGroup labels={labels} remove={remove}/>
    </span>

    {children}
  </ItemUI.Header>);
}
