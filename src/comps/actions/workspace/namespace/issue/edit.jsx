import React from "react";
import {Query} from '@nebulario/tracker-app-query'
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
import {refetch, refetchIssue} from './refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueEdit ($config: JSON!, $workspaceid: String!, $issueid: String! $input: WorkspaceIssueEditInput!){
  viewer (config:$config)  {
      workspaces {
        workspace (workspaceid: $workspaceid) {
          namespace {
            issues {
              issue (issueid: $issueid) {
                edit (input: $input) {
                  ...OperationGeneralFragment
                }
              }
            }
          }
        }
      }
    }
  }
${OperationQueries.GeneralFragment}`, inp => [
  ...refetch(inp),
  ...refetchIssue(inp)
]);

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

export const Edit = (props) => {
  const {
    componentid,
    workspace: {
      workspaceid
    },
    issue: {
      issueid,
      subject,
      description
    },
    onLoadingQueries
  } = props;

  const initial = {
    subject: {
      value: subject
    },
    description: {
      value: description
    }
  };

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-primary",
    label: <i className="fa fa-edit">{' '}Edit</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            namespace: {
              issues: {
                issue: {
                  edit: operation
                }
              }
            }
          }
        }
      }
    }) => operation,
    mutation
  }

  const propsModal = {
    componentid: componentid + "_modal",
    onLoadingQueries: onLoadingQueries && onLoadingQueries({workspaceid, issueid}),
    OperationButton: ({values, onClick, isValid, className}) => {

      const {subject, description} = values;

      const propsForm = {
        className: className + " " + propsOperation.className,
        isValid,
        variables: {
          workspaceid,
          issueid,
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
    label: <i className="fa fa-edit">{' '}Edit</i>,
    header: <span>Edit issue</span>,
    Content: FormFields
  }

  return <OperationModal.Form {...propsModal}></OperationModal.Form>;

}
