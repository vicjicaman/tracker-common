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
import {OperationButton, Queries as OperationQueries, Modal as OperationModal, RegisterOperationRefetch} from 'PKG/app-operation/src'
import {refetch} from './refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceCreate ($config: JSON!, $workspaceid: String!, $url: String!){
  viewer (config:$config)  {
      workspaces {
        create (workspaceid:$workspaceid, url:$url) {
          ...OperationGeneralFragment
        }
      }
    }
  }
${OperationQueries.GeneralFragment}`, inp => [...refetch(inp)]);

const validator = [
  {
    field: 'workspaceid',
    method: 'isEmpty',
    validWhen: false,
    message: 'A local workspace name is required.'
  }, {
    field: 'url',
    method: 'isEmpty',
    validWhen: false,
    message: 'Pleave provide a git repository url.'
  }
];

/*
const initial = {
  workspaceid: {
    value: "tracews.com"
  },
  url: {
    value: "github.com:vicjicaman/tracews.com.git"
  }
};
*/

const initial = {
  workspaceid: {
    value: ""
  },
  url: {
    value: ""
  }
};

const FormFields = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>

  <div className="alert alert-warning" role="alert">
    <i className="fa fa-exclamation-triangle"></i>{' '}
    Make sure that the provided git repository is already a repoflow repository or an empty repository.<br/>
    The tool will make changes, commits and push to it.
  </div>

  <FormGroup>
    <Label for="workspaceid">Local workspace id</Label>
    <Input invalid={!validation.workspaceid.isValid && fields.workspaceid.touched} value={values.workspaceid} id={componentid + "_workspaceid"} type="text" onChange={(e) => {
        setFormField("workspaceid", e.target.value);
      }}/>
    <FormFeedback>{validation.workspaceid.message}</FormFeedback>
  </FormGroup>
  <FormGroup>
    <Label for="url">Git repository URL</Label>
    <Input invalid={!validation.url.isValid && fields.url.touched} value={values.url} id={componentid + "_url"} type="text" onChange={(e) => {
        setFormField("url", e.target.value);
      }}/>
    <FormFeedback>{validation.url.message}</FormFeedback>
  </FormGroup>
</React.Fragment>);

export const Create = (props) => {
  const {componentid} = props;

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-primary",
    label: <i className="fa fa-plus">{' '}Create</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          create: operation
        }
      }
    }) => operation,
    mutation
  }

  const propsModal = {
    componentid: componentid + "_modal",
    OperationButton: ({values, onClick, isValid, className}) => {

      const propsForm = {
        className: className + " " + propsOperation.className,
        isValid,
        variables: {
          ...values
        },
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    initial,
    validator,
    className: "btn-secondary",
    label: (<i className="fa fa-plus">{' '}Create</i>),
    header: (<span>Create a local workspace</span>),
    Content: FormFields
  }

  return <OperationModal.Form {...propsModal}></OperationModal.Form>
}
