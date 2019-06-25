import React from "react";
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {LoadingButton} from '@nebulario/tracker-app-ui';

export const PureComp = ({
  id,
  className,
  loading,
  open,
  openForm,
  closeForm,
  handler,
  Label,
  Action,
  disabled
}) => {

  // Change all the files mutation to the refactored flowExe method

  return (<React.Fragment>
    <LoadingButton disabled={disabled || loading} id={"FormTrigger_" + id} loading={loading} className={className + " btn-xs"} onClick={(e) => {
        openForm();
      }}>
      <Label></Label>
    </LoadingButton>
    <Popover placement="bottom" isOpen={open} target={"FormTrigger_" + id} style={{
        maxWidth: "600px"
      }}>
      <PopoverHeader>
        <span>
          <i className="fa fa-question"></i>{' '}Confirmation</span>
      </PopoverHeader>
      <PopoverBody>

        <div className="row" style={{
            width: "300px"
          }}>

          <div className="col-6">
            <Action closeForm={closeForm}></Action>

          </div>

          <div className="col-6">
            <button onClick={(e) => {
                e.preventDefault();
                closeForm();
                return false;
              }} type="button" className="btn btn-secondary">
              Abort</button>
          </div>

        </div>

      </PopoverBody>
    </Popover>
  </React.Fragment>);

};

const Comp = compose(
/**/
withStateHandlers(() => ({open: false}), {
  openForm: (props) => () => ({open: true}),
  closeForm: (props) => () => ({open: false})
}),
/**/
lifecycle({componentDidUpdate() {}})/***/
/**/)(PureComp);
export {
  Comp as ConfirmPopover
};
