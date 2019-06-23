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

export const Commit = (props) => {
  const {componentid, mutation, getOperation, onLoadingQueries, variables} = props;

  const label = <i className="fa fa-angle-double-right">{' '}Commit</i>;
  const className = "btn-secondary";

  const propsOperation = {
    componentid,
    className,
    label,
    getOperation,
    mutation,
    variables: {
      ...variables,
      input: null
    },
    onLoadingQueries
  }

  return <OperationButton {...propsOperation}></OperationButton>
}

const validator = [
  {
    field: 'subject',
    method: 'isEmpty',
    validWhen: false,
    message: 'Pleave provide a subject.'
  }
];

const CommitFileds = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>
  <FormGroup>
    <Label for="subject">Subject</Label>
    <Input invalid={!validation.subject.isValid && fields.subject.touched} value={values.subject} id={componentid + "_subject"} type="text" onChange={(e) => {
        setFormField("subject", e.target.value);
      }}/>
    <FormFeedback>{validation.subject.message}</FormFeedback>
  </FormGroup>
  <FormGroup>
    <Label for="message">Message</Label>
    <Input value={values.message} id={componentid + "_message"} type="textarea" rows={8} onChange={(e) => {
        setFormField("message", e.target.value);
      }}/>
  </FormGroup>
</React.Fragment>)

export const CommitMessage = (props) => {
  const {
    componentid,
    mutation,
    getOperation,
    onLoadingQueries,
    variables,
    subject,
    label: customLabel
  } = props;

  const Label = ({children}) => <i className="fa fa-angle-double-right">{' '}{children}</i>;
  const className = "btn-secondary";

  const initial = {
    subject: {
      value: subject || ""
    },
    message: {
      value: ""
    }
  };

  const propsOperation = {
    componentid,
    className,
    label: <Label>Commit</Label>,
    getOperation,
    mutation,
    variables,
    onLoadingQueries
  }

  const propsForm = {
    componentid: componentid + "_popover",
    onLoadingQueries,
    OperationButton: ({values, locked, onClick, isValid, className}) => {
      const {subject, message} = values;

      const propsForm = {
        isValid,
        onClick,
        className: className + " " + propsOperation.className,
        variables: {
          ...variables,
          input: {
            subject,
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
      : <Label>Commit</Label>,
    header: customLabel
      ? customLabel
      : <span>Commit</span>,
    Content: CommitFileds
  }

  return <OperationModal.Form {...propsForm}></OperationModal.Form>
}
