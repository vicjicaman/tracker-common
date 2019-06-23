import React from "react";
import {compose} from 'recompose';
import {OperationModal, OperationModalConnector} from './modal'

const ConfirmFooter = compose(OperationModalConnector)(({componentid, closeModal, OperationButton}) => {

  return (<React.Fragment>
    <OperationButton onClick={(e) => {
        e.preventDefault();
        closeModal();
      }} className={"mr-auto"} closeModal={closeModal}/>

    <button id={componentid + "_cancel"} onClick={(e) => {
        e.preventDefault();
        closeModal();
      }} type="button" className="btn btn-sm mt-1 mr-1  btn-secondary pull-right">
      <i className="fa fa-times-circle"></i>{' '}Cancel</button>
  </React.Fragment>);
});

export const OperationConfirm = (props) => {

  const {
    componentid,
    OperationButton,
    className,
    label,
    header,
    content,
    onLoadingQueries
  } = props;

  const propsModal = {
    componentid: componentid + "_confirm",
    header,
    className,
    label,
    content,
    footer: <ConfirmFooter componentid={componentid + "_confirm"} OperationButton={OperationButton}/>,
    onLoadingQueries
  }

  return <OperationModal {...propsModal}></OperationModal>
}
