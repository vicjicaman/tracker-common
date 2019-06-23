import React from "react";
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {LoadingButton} from '../app-ui/src';

export const PureComp = ({
  className,
  id,
  initial,
  loading,
  open,
  openForm,
  closeModal,
  handler,
  Form,
  Label,
  Title,
  Action,
  disabled
}) => {

  const header = Title
    ? <PopoverHeader>
        <Title></Title>
      </PopoverHeader>
    : null;

  // Change all the files mutation to the refactored flowExe method

  return (<React.Fragment>
    <LoadingButton disabled={disabled || loading} id={"FormTrigger_" + id} loading={loading} className={(
        className
        ? className
        : " btn-secondary ") + " btn-xs"} onClick={(e) => {
        openForm();
      }}>
      <Label></Label>
    </LoadingButton>
    <Popover placement="bottom" isOpen={open} target={"FormTrigger_" + id}>
      {header}
      <PopoverBody>
        <form id={"Form" + id}>
          <Form initial={initial} ActionGroup={({data}) => (<div className="form-group row">
              <div className="col-sm-6">
                <Action data={data} closeModal={closeModal}></Action>
              </div>
              <div className="col-sm-6">
                <button onClick={(e) => {
                    e.preventDefault();
                    closeModal();
                    return false;
                  }} type="button" className="btn btn-danger">
                  <i className="fa fa-times-circle"></i>{' '}Cancel</button>
              </div>
            </div>)}></Form>
        </form>
      </PopoverBody>
    </Popover>
  </React.Fragment>);

};

const Comp = compose(
/**/
withStateHandlers(() => ({open: false}), {
  openForm: (props) => () => ({open: true}),
  closeModal: (props) => () => ({open: false})
}),
/**/
lifecycle({componentDidUpdate() {}})/***/
/**/)(PureComp);
export {
  Comp as FormButton
};
