import React from "react";
import {NavLink, Switch, Route} from 'react-router-dom';
import loadable from 'loadable-components';
import {compose} from 'recompose';
import {addLocaleData} from 'react-intl';
import {combineReducers} from 'redux';
import {LangProvider, withLang} from '@nebulario/tracker-lang';
import {reducers as EventReducers} from '@nebulario/tracker-app-events';
import {reducers as QueryReducers, QueryManager, QueryProvider} from '@nebulario/tracker-app-query';
import {OperationManager, reducers as OperationReducers} from 'PKG/app-operation/src';
import {reducers as ContentReducers} from 'PKG/app-content/src';
import {reducers as InlineSearchReducers} from 'PKG/app-search/src';
import {reducers as ListReducers} from 'PKG/app-list/src';
import {StreamManager, reducers as StreamReducers} from '@nebulario/tracker-app-stream';
import {reducers as FormReducers} from 'PKG/app-form/src';
import {reducers as ModalReducers} from 'PKG/app-modal/src';
import {reducers as ComponentReducers} from 'PKG/app-component/src';
import {refetch} from "Queries/refetch"

import {NotifyContainer} from '@nebulario/tracker-notify';
import {Sidebar, Layout} from '@nebulario/tracker-layout';

import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import de from 'react-intl/locale-data/de';

import * as Queries from 'Queries';
import * as Root from './root';

import en_msg from './utils/locales/en.json';
import es_msg from './utils/locales/es.json';
import de_msg from './utils/locales/de.json';

const messages = {
  en: en_msg,
  es: es_msg,
  de: de_msg
};

addLocaleData([
  ...en,
  ...de,
  ...es
]);

String.prototype.trunc = String.prototype.trunc || function(n) {
  return (this.length > n)
    ? this.substr(0, n - 1) + '...'
    : this;
};

String.prototype.safeId = String.prototype.safe || function() {
  return this.replace(/\./g, "_").replace(/\//g, "_").replace(/\|/g, "_");
};

const leftNavbar = (<React.Fragment></React.Fragment>);
const brand = (<span className="navbar-brand"><i className="fa fa-code-fork"/>{' '}Tracker</span>);
const rightNavbar = (<React.Fragment></React.Fragment>);
// Licensed to <<EMAIL>>
const cntLicense = <span className="small"></span>;

/************************************************************/
const App = compose(
/**/
withLang(messages)
/**/)(
/* COMPONENT */
({componentid}) => (<Layout componentid={componentid + "_layout"} brand={brand} rightMenu={[rightNavbar]} leftMenu={[leftNavbar]} content={cntLicense} indices={(<Root.Indice></Root.Indice>)
}>
  <Root.Content></Root.Content>

</Layout>));

export default() => (<LangProvider flag="us">
  <StreamManager></StreamManager>
  <QueryManager refetch={refetch}></QueryManager>
  <NotifyContainer/>
  <OperationManager></OperationManager>
  <QueryProvider>
    <App componentid={"app"}></App>
  </QueryProvider>

</LangProvider>);

export const watchers = [/* ...RequestWatchers */];
export const reducers = combineReducers({
  events: EventReducers,
  queries: QueryReducers,
  content: ContentReducers,
  search: InlineSearchReducers,
  form: FormReducers,
  list: ListReducers,
  stream: StreamReducers,
  operation: OperationReducers,
  modal: ModalReducers,
  component: ComponentReducers
});

export const clientState = {
  typeDefs: [
  ],
  resolvers: {
  },
  defaults: {
    events: []
  }
}
