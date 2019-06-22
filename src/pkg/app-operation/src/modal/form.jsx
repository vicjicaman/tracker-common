import React from "react";
import {OperationConfirm} from './confirm'
import {Form, FormValidator} from '../../../app-form/src'
import {OperationFormConnected} from '../utils'
import {compose, lifecycle} from 'recompose';

export const OperationForm = (props) => {
  const {
    componentid,
    OperationButton,
    header,
    Content,
    className,
    label,
    initial: initialValues,
    validator: validatorValues,
    onLoadingQueries,
    attributes
  } = props;

  const componentFormId = componentid + "_form";
  const validator = new FormValidator(validatorValues);

  const initial = {
    values: initialValues
  };

  const propsModal = {
    componentid: componentid + "_container",
    className,
    label,
    header,
    OperationButton: (props) => {
      const {componentid, closeModal, className} = props;

      const propsConnect = {
        connectFormId: componentFormId,
        OperationButton,
        closeModal,
        className,
        //initial,
        validator,
        initial
      }

      return <OperationFormConnected {...propsConnect}></OperationFormConnected>
    },
    content: <Form componentid={componentFormId} initial={initial} validator={validator} attributes={attributes}>
      {Content}
    </Form>,
    onLoadingQueries

  }

  return <OperationConfirm {...propsModal}></OperationConfirm>
};
