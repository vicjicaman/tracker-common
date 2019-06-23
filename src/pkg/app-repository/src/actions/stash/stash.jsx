import React from "react";
import gql from "graphql-tag";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
import {OperationButton, Modal as OperationModal} from 'PKG/app-operation/src'
import {Icon} from '../../stash'

const validator = [/*{
    field: 'message',
    method: 'isEmpty',
    validWhen: false,
    message: 'Pleave provide a message.'
  }*/];

const FormFields = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>
  <FormGroup>
    <Label for="message">Message</Label>
    <Input value={values.message} id={componentid + "_message"} type="textarea" rows={8} onChange={(e) => {
        setFormField("message", e.target.value);
      }}/>
  </FormGroup>
</React.Fragment>)

export const StashMessage = (props) => {
  const {
    componentid: componentidRaw,
    mutation,
    getOperation,
    onLoadingQueries,
    variables,
    label: customLabel
  } = props;

  const componentid = componentidRaw.safeId();

  const Label = ({children}) => <span><Icon/>{' '}{children}</span>;
  const className = "btn-secondary";

  const initial = {
    message: {
      value: ""
    }
  };

  const propsOperation = {
    componentid,
    className,
    label: <Label>Stash</Label>,
    getOperation,
    mutation,
    variables,
    onLoadingQueries
  }

  const propsForm = {
    componentid: componentid + "_stash",
    onLoadingQueries,
    OperationButton: ({values, locked, onClick, isValid, className}) => {
      const {message} = values;

      const propsForm = {
        isValid,
        onClick,
        className: className + " " + propsOperation.className,
        variables: {
          ...variables,
          input: {
            message
          }
        }
      }
      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    initial,
    validator,
    className: "btn-secondary",
    label: customLabel
      ? customLabel
      : <Icon/>,
    header: customLabel
      ? customLabel
      : <span>Stash</span>,
    Content: FormFields
  }

  return <OperationModal.Form {...propsForm}></OperationModal.Form>
}
