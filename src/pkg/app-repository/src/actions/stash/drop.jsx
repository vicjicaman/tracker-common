import React from "react";
import gql from "graphql-tag";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal} from 'PKG/app-operation/src'

export const Drop = (props) => {
  const {
    componentid: componentidRaw,
    mutation,
    getOperation,
    onLoadingQueries,
    variables,
    variables: {
      moduleid,
      stashid
    }
  } = props;

  const componentid = componentidRaw + "_" + stashid;

  const Label = ({children}) => <span><i className="fa fa-times"/>{' '}{children}</span>;
  const className = "btn-danger";

  const propsOperation = {
    componentid,
    className,
    label: <Label>Drop</Label>,
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

      return <OperationButton {...propsOperation} {...propsForm}></OperationButton>
    },
    className: "dropdown-item",
    label: (<i className="fa fa-times text-danger">{' '}Drop</i>),
    header: (<span>Drop stash{' '}<b>{stashid}</b>{' '}on the repository{' '}<b>{moduleid}</b></span>),
    Content: null

  }
  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>
}
