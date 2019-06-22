import React from "react";
import {compose} from 'recompose'
import {Link, Switch, Route} from 'react-router-dom';
import * as Routes from 'Routes'

export const Content = ({componentid, Header}) => (<React.Fragment><Header componentid={componentid + "_header"}/>
  <div>
    <span></span>
  </div>
</React.Fragment>);
export const Indice = () => (<li className="breadcrumb-item">
  <Link to={Routes.home()}>home</Link>
</li>);
