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
import {refetch, refetchIssue} from '../refetch'

const mutation = RegisterOperationRefetch(gql `
  mutation WorkspaceIssueCommentCreate ($config: JSON!, $workspaceid: String!, $issueid: String!, $input: CommentCreateInput!){
  viewer (config:$config)  {
      workspaces {
        workspace (workspaceid: $workspaceid) {
          namespace {
            issues {
              issue (issueid: $issueid) {
                comments {
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
    field: 'comment',
    method: 'isEmpty',
    validWhen: false,
    message: 'A comment is required.'
  }
];

const initial = {
  comment: {
    value: ""
  }
};

const FormFields = ({componentid, setFormField, validation, values, fields}) => (<React.Fragment>
  <FormGroup>
    <Label for="comment">Comment</Label>
    <Input invalid={!validation.comment.isValid && fields.comment.touched} value={values.comment} id={componentid + "_comment"} type="textarea" rows={8} onChange={(e) => {
        setFormField("comment", e.target.value);
      }}/>
    <FormFeedback>{validation.comment.message}</FormFeedback>
  </FormGroup>
</React.Fragment>);

export const Create = ({componentid, workspace: {
    workspaceid
  }, issue: {
    issueid
  }, onLoadingQueries}) => {

  const propsOperation = {
    componentid: componentid + "_operation",
    className: "btn-primary",
    label: <i className="fa fa-plus">{' '}Create</i>,
    getOperation: ({
      viewer: {
        workspaces: {
          workspace:{
            namespace: {
              issues: {
                issue: {
                  comments: {
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

      const {comment} = values;

      const propsForm = {
        className: className + " " + propsOperation.className,
        isValid,
        variables: {
          workspaceid,
          issueid,
          input: {
            comment
          }
        },
        onClick
      }

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    initial,
    validator,
    className: "btn-secondary",
    label: <i className="fa fa-comment">{' '}Comment</i>,
    header: <span>Create a comment</span>,
    Content: FormFields
  }

  return <OperationModal.Form {...propsModal}></OperationModal.Form>;
}
