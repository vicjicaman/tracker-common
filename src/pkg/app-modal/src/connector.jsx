import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './state/actions'

const mapDispatchToProps = (dispatch, {componentid}) => {

  return ({
    openModal: function() {
      dispatch(Actions.onModalState({componentid, open: true}))
    },
    closeModal: function() {
      dispatch(Actions.onModalState({componentid, open: false}))
    }
  })
}

const mapStateToProps = (state, {componentid}) => {
  return {modal: state.app.modal[componentid]};
};

export const ModalConnector = connect(mapStateToProps, mapDispatchToProps);
