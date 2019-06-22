import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {compose, lifecycle} from 'recompose';
import {ModalConnector} from './connector'

export const DefaultFooter = ({componentid, closeModal}) => {

  return (<button id={componentid + "_close"} onClick={(e) => {
      e.preventDefault();
      closeModal();
    }} type="button" className="btn btn-secondary pull-right">
    <i className="fa fa-times-circle"></i>{' '}Close</button>);
}

export const PureComp = (props) => {
  const {
    componentid,
    className,
    label,
    header,
    content,
    footer
  } = props;

  if (!componentid) {
    return <b className="text-danger">INVALID</b>
  }

  const {modal, openModal, closeModal} = props;

  if (!modal) {
    return null;
  }

  const {open} = modal;

  const triggerCompId = componentid.safeId() + "_trigger";

  return (<React.Fragment>
    <button type="button" id={triggerCompId} className={"btn " + (
        className
        ? className
        : " btn-secondary ")} onClick={function(e) {
        openModal();
      }}>
      {label}
    </button>
    <Modal keyboard={true} placement="bottom" isOpen={open} fade={false} target={triggerCompId} size={"lg"}>
      <ModalHeader>
        {header}
      </ModalHeader>
      <ModalBody>
        {content}
      </ModalBody>
      <ModalFooter>
        {
          footer
            ? footer
            : <DefaultFooter closeModal={closeModal}/>
        }
      </ModalFooter>
    </Modal>
  </React.Fragment>);

};

const Comp = compose(
/**/
ModalConnector,
/**/
lifecycle({
  componentDidMount: function() {
    const {initial, modal, openModal, closeModal} = this.props;

    if (!modal) {
      if (initial) {
        openModal();
      } else {
        closeModal();
      }
    }

  }

})
/**/)(PureComp);
export {
  Comp as Modal
};
