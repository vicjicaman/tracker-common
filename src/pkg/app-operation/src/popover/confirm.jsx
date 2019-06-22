import React from "react";
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {OperationPopover} from './popover'

export const OperationConfirm = (props) => {

  const {
    componentid,
    OperationButton,
    lock,
    className,
    Label,
    Header,
    Content,
    style,
    onLoadingQueries
  } = props;

  const propsPopover = {
    componentid: componentid + "_confirm",
    lock,
    onLoadingQueries,
    Header,
    className,
    style,
    Label,
    Content: ({locked, closeForm}) => {

      return (<React.Fragment>
        <div className="row">
          <div className="col-12">
            <Content componentid={componentid + "_content"} locked={locked} closeForm={closeForm}></Content>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <OperationButton className={"mr-auto"} locked={locked} closeForm={closeForm}></OperationButton>
          </div>
          <div className="col-sm-6">
            <button id={componentid + "_cancel"} onClick={(e) => {
                e.preventDefault();
                closeForm();
              }} type="button" className="btn btn-danger pull-right">
              <i className="fa fa-times-circle"></i>{' '}Cancel</button>
          </div>
        </div>
      </React.Fragment>);

    }
  }

  return <OperationPopover {...propsPopover}></OperationPopover>
}

/*  */
