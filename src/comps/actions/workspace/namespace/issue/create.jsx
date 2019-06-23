import React from "react";
import {Query} from 'PKG/app-query/src'
import gql from "graphql-tag";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetch} from './refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueCreate ($config: JSON!, $workspaceid: String!, $input: WorkspaceIssueCreateInput!){
  viewer (config:$config)  {
      workspaces {
        workspace (workspaceid: $workspaceid) {
          namespace {
            issues {
              create (input: $input) {
                ...OperationGeneralFragment
              }
            }
          }
        }
      }
    }
  }
${OperationQueries.GeneralFragment}`, inp => [...refetch(inp)]);

const validator = [
  {
    field: 'subject',
    method: 'isEmpty',
    validWhen: false,
    message: 'A subject is required.'
  }, {
    field: 'description',
    method: 'isEmpty',
    validWhen: false,
    message: 'A description is required.'
  }
];

const initial = {
  subject: {
    value: ""
  },
  description: {
    value: ""
  }
};

const FormFields = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>

  <FormGroup>
    <Label for="subject">Subject</Label>
    <Input invalid={!validation.subject.isValid && fields.subject.touched} value={values.subject} id={componentid + "_subject"} type="text" onChange={(e) => {
        setFormField("subject", e.target.value);
      }}/>
    <FormFeedback>{validation.subject.message}</FormFeedback>
  </FormGroup>

  <FormGroup>
    <Label for="description">Description</Label>
    <Input invalid={!validation.description.isValid && fields.description.touched} value={values.description} id={componentid + "_description"} type="textarea" rows={8} onChange={(e) => {
        setFormField("description", e.target.value);
      }}/>
    <FormFeedback>{validation.description.message}</FormFeedback>
  </FormGroup>
</React.Fragment>);

export const Create = (props) => {
  const {componentid, workspace: {
      workspaceid
    }, onLoadingQueries} = props;

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-primary",
    label: <i className="fa fa-plus">{' '}Create</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            namespace: {
              issues: {
                create: operation
              }
            }
          }
        }
      }
    }) => operation,
    mutation,
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid})
  }

  const propsModal = {
    componentid: componentid + "_modal",
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid}),
    OperationButton: ({values, onClick, isValid, className}) => {

      const {subject, description} = values;

      const propsForm = {
        className: className + " " + propsOperation.className,
        isValid,
        variables: {
          workspaceid,
          input: {
            subject,
            description
          }
        },
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    initial,
    validator,
    className: "btn-secondary",
    label: <i className="fa fa-plus">{' '}Create</i>,
    header: <span>Create a issue</span>,
    Content: FormFields
  }

  return <OperationModal.Form {...propsModal}></OperationModal.Form>;
}
/*
<div className="alert alert-warning" role="alert">
  <i className="fa fa-exclamation-triangle"></i>{' '}
  A issue is a branch on the workspace namespace, this action will checkout or create it.<br/>
  The tool will make changes, commits and push to the issue namespace.
</div>
*/
