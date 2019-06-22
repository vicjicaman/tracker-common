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
import {OperationDrop, OperationButton, Modal as OperationModal} from 'PKG/app-operation/src'

export const MergeBegin = (props) => {
  const {componentid, mutation, getOperation, onLoadingQueries, variables} = props;

  const label = <i className="fa fa-bolt">{' '}Begin merge...</i>;
  const className = "btn-secondary";

  const propsOperation = {
    componentid,
    className,
    label,
    getOperation,
    mutation,
    variables,
    onLoadingQueries
  }

  return <OperationButton {...propsOperation}></OperationButton>
}

export const MergeAbort = (props) => {
  const {componentid, mutation, getOperation, onLoadingQueries, variables} = props;

  const label = <i className="fa fa-times">{' '}Abort!</i>;
  const className = "btn-danger";

  const propsOperation = {
    componentid,
    className,
    label,
    getOperation,
    mutation,
    variables,
    onLoadingQueries
  }

  const propsModal = {
    componentid: componentid + "_modal",
    onLoadingQueries,
    OperationButton: ({className, onClick}) => {

      const propsForm = {
        className: className + " " + propsOperation.className,
        onClick
      }

      //<div className="alert alert-warning" role="alert">
      //    <i className="fa fa-exclamation-triangle"></i>{' '}
      //    The merge procces will be aborted
      //  </div>

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    className: "btn-danger",
    label,
    header: (<span>Abort merge!</span>),
    Content: () => <span></span>
  }

  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>
}

export const MergeDirect = (props) => {
  const {componentid, mutation, getOperation, onLoadingQueries, variables} = props;

  const label = <i className="fa fa-bolt">{' '}Direct merge</i>;
  const className = "dropdown-item";

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
    onLoadingQueries,
    size: ""
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

const FormFields = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>
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


export const MergeMessage = (props) => {
  const {
    componentid,
    mutation,
    getOperation,
    onLoadingQueries,
    variables,
    subject
  } = props;

  const Label = ({children}) => <i className="fa fa-comment">{' '}{children}</i>;
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
    label: <Label>Merge</Label>,
    getOperation,
    mutation,
    variables,
    onLoadingQueries
  }

  const propsForm = {
    componentid: componentid + "_popover",
    onLoadingQueries,
    size: "",
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
    className: "dropdown-item",
    label: (<Label>With message</Label>),
    header: (<span>Merge</span>),
    Content: FormFields
  }

  return <OperationModal.Form {...propsForm}></OperationModal.Form>
}

export const Merge = ({componentid, operations, onLoadingQueries}) => {

  const dropProps = {
    componentid,
    className: "btn-secondary",
    icon: "bolt",
    label: "Merge",
    onLoadingQueries,
    operations
  };

  return (<OperationDrop {...dropProps}/>)
}
