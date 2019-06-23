import React from "react";
import {compose} from 'recompose';
import {QueryConnector} from './QueryConnector'
import {QueryContext} from './context'

export const PureComp = ({children, queriesToRefetch}) => {
  return (<QueryContext.Provider value={queriesToRefetch}>
    {children}
  </QueryContext.Provider>);
}

const Comp = compose(QueryConnector)(PureComp);

export {
  Comp as QueryProvider
}
