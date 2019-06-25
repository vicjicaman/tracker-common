import React from "react";
import {LoadingIcon} from '@nebulario/tracker-app-ui';
import {InProgress} from 'PKG/app-query/src'
import {Modal, ModalConnector} from '@nebulario/tracker-app-modal'
import {compose, lifecycle, withProps} from 'recompose';

export const OperationModalConnector = compose(withProps(({componentid}) => ({
  componentid: componentid + "_modal"
})), ModalConnector);

export const PureComp = (props) => {
  const {
    componentid,
    className,
    label,
    header,
    content,
    footer,
    onLoadingQueries,
    size = "btn-sm"
  } = props;

  const loading = (<button disabled={true} className={"btn mt-1 mr-1 " + size + " " + className}>
    <LoadingIcon></LoadingIcon>
  </button>);

  const contentModal = (<Modal componentid={componentid + "_modal"} className={className + " " + size + " mt-1 mr-1"} label={label} header={header} content={content} footer={footer}/>);

  if (onLoadingQueries) {
    return (<InProgress onLoadingQueries={onLoadingQueries} loading={loading} content={contentModal}></InProgress>);
  } else {
    return contentModal;
  }

};

export {
  PureComp as OperationModal
};
