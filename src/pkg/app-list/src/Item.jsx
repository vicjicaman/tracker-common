import React from "react";
import _ from "lodash";
import {compose, lifecycle} from 'recompose';
import {ErrorBoundary} from '../../app-error/src';
import {ConfigMenu} from '../../app-ui/src';
import {queriesInProgress} from '@nebulario/tracker-app-query';
import {Content} from '../../app-content/src';

export const ItemPureComp = (props) => {
  const {
    componentid,
    attributes,
    item,
    sections,
    header,
    footer,
    onLoadingQueries,
    queries,
    mode,
    type,
    size
  } = props;

  const loading = onLoadingQueries && queriesInProgress(queries, onLoadingQueries({item, attributes}));

  const contentProps = {
    ...props,
    attributes,
    componentid,
    sections,
    header,
    footer,
    loading,
    mode,
    contentClass: size === "regular"
      ? "col-12 col-md-4 col-lg-3"
      : "col-12 col-md-4 col-lg-4"
  };

  const MainContent = sections[0].content;

  return (<ErrorBoundary>
    {type === "card" && (<Content className="mb-4" {...contentProps}></Content>)}
    {
      type === "ul" && (<li className="p-1 list-group-item">
        <MainContent {...contentProps}></MainContent>
      </li>)
    }
  </ErrorBoundary>)
};

const Comp = compose(
/**/
lifecycle({
  shouldComponentUpdate: function(nextProps, nextState) {
    const {ItemShouldUpdate} = this.props;

    if (ItemShouldUpdate && !ItemShouldUpdate(this.props, this.state, nextProps, nextState)) {
      return false;
    }

    return true;
  }
})
/**/)(ItemPureComp);
export {
  Comp as Item
};
