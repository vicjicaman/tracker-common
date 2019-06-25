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
import {refetch, refetchIssue} from '../refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueLabelCreate ($config: JSON!, $workspaceid: String!, $issueid: String!, $input: LabelCreateInput!){
  viewer (config:$config)  {
      workspaces {
        workspace (workspaceid: $workspaceid) {
          namespace {
            issues {
              issue (issueid: $issueid) {
                labels {
                  create (input: $input) {
                    ...OperationGeneralFragment
                  }
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
    field: 'labelid',
    method: 'isEmpty',
    validWhen: false,
    message: 'A label is required.'
  }
];

const FormFields = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>

  <FormGroup>
    <Label for="labelid">Label</Label>
    <Input invalid={!validation.labelid.isValid && fields.labelid.touched} value={values.labelid} id={componentid + "_labelid"} type="text" onChange={(e) => {
        setFormField("labelid", e.target.value);
      }}/>
    <FormFeedback>{validation.labelid.message}</FormFeedback>
  </FormGroup>

  <FormGroup>
    <Label for="type">Type</Label>
    <Input value={values.type} type="select" id={componentid + "_type"} onChange={(e) => {
        setFormField("type", e.target.value);
      }}>
      {
        _.map([
          {
            type: "info"
          }, {
            type: "success"
          }, {
            type: "warning"
          }, {
            type: "danger"
          }, {
            type: "secondary"
          }
        ], ({type}) => <option className={"text-" + type}>{type}</option>)
      }
    </Input>
  </FormGroup>

</React.Fragment>);

const initial = {
  labelid: {
    value: ""
  },
  type: {
    value: "info"
  }
};

export const Create = ({
  componentid,
  workspace: {
    workspaceid
  },
  issue: {
    issueid,
    labels
  },
  onLoadingQueries
}) => {

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-primary",
    label: <i className="fa fa-plus">{' '}Add</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace: {
            namespace: {
              issues: {
                issue: {
                  labels: {
                    create: operation
                  }
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

      const {type, labelid} = values;

      const propsForm = {
        className: className + " " + propsOperation.className,
        isValid,
        variables: {
          workspaceid,
          issueid,
          input: {
            labelid,
            type
          }
        },
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    initial,
    validator,
    className: "btn-secondary",
    label: <i className="fa fa-tag">{' '}Label</i>,
    header: <span>Add a Label</span>,
    Content: FormFields
  }

  return <OperationModal.Form {...propsModal}></OperationModal.Form>;
}
