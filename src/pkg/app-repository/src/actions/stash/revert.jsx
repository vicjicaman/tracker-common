import React from "react";
import gql from "graphql-tag";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {OperationButton, Queries as OperationQueries, Modal as OperationModal} from 'PKG/app-operation/src'

export const Revert = (props) => {
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

  const Label = ({children}) => <span><i className="fa fa-undo"/>{' '}{children}</span>;
  const className = "btn-warning";

  const propsOperation = {
    componentid,
    className,
    label: <Label>Revert</Label>,
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
    label: (<i className="fa fa-undo text-warning">{' '}Revert</i>),
    header: (<span>Revert stash{' '}<b>{stashid}</b>{' '}on the repository{' '}<b>{moduleid}</b></span>),
    content: null

  }
  return <OperationModal.Confirm {...propsModal}></OperationModal.Confirm>
}
