import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './state/actions'

const mapDispatchToProps = function(dispatch, {componentid, initial}) {

  return ({
    setForm: function(initial) {
      dispatch(Actions.onInit({componentid: componentid, initial}))
    },
    setFormField: function(field, value) {
      dispatch(Actions.onChangeField({componentid: componentid, field, value, initial}))
    },
    submit: function() {
      dispatch(Actions.onSubmit({componentid: componentid, initial}))
    },
    submitHandled: function() {
      dispatch(Actions.onSubmitHandled({componentid: componentid, initial}))
    },
    touchForm: function(field, value) {
      dispatch(Actions.onTouchForm({componentid: componentid, initial}))
    }
  })
}

const mapStateToProps = function(state, ownProps) {
  const componentid = ownProps.componentid;
  const {initial} = ownProps;

  return {
    form: state.app.form[componentid] || initial
  };

};

export const FormConnector = connect(mapStateToProps, mapDispatchToProps);

const mapStateToPropsExt = function(state, {connectFormId, initialForm}) {
  return {
    form: state.app.form[connectFormId] || initialForm
  };
};

const mapDispatchToPropsExt = function(dispatch, {connectFormId, initialForm}) {
  return ({
    touchForm: function(field, value) {
      dispatch(Actions.onTouchForm({componentid: connectFormId, initial: initialForm}))
    }
  })
}

export const ExtFormConnector = connect(mapStateToPropsExt, mapDispatchToPropsExt);
