import React from "react";
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {OperationConfirm} from './confirm'
import {Form, FormValidator} from '../../../app-form/src'
import {OperationFormConnected} from '../utils'

// Check the device
export const PureComp = (props) => {
  const {
    componentid,
    OperationButton,
    Header,
    Content,
    lock,
    className,
    Label,
    initial: initialValues,
    validator: validatorValues,
    onLoadingQueries
  } = props;

  const componentFormId = componentid + "_form";
  const validator = new FormValidator(validatorValues);

  const initial = {
    values: initialValues
  };

  const propsPop = {
    componentid: componentid + "_container",
    lock,
    className,
    Label,
    Header,
    onLoadingQueries,
    OperationButton: (props) => {
      const {componentid, closeForm, locked, className} = props;

      const propsConnect = {
        connectFormId: componentFormId,
        OperationButton,
        closeForm,
        locked,
        className,
        initial,
        initial,
        validator
      }

      return <OperationFormConnected {...propsConnect}></OperationFormConnected>
    },
    Content: (props) => <Form componentid={componentFormId} initial={initial} validator={validator}>

        {
          ({touchForm, setFormField, values, fields, validation}) => {
            return (<Content {...props} componentid={componentid + "_fields"} validation={validation} values={values} fields={fields} setFormField={setFormField} touchForm={touchForm}></Content>);
          }
        }

      </Form>

  }

  return <OperationConfirm {...propsPop}></OperationConfirm>
};

const Comp = compose(
/**/)(PureComp);
export {
  Comp as OperationForm
};
