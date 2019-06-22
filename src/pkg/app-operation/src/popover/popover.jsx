import React from "react";
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {LoadingButton, LoadingIcon} from '../../../app-ui/src';
import {isLocked} from '../utils'
import {InProgress} from '../../../app-query/src'

export const PureComp = (props) => {
  const {
    componentid,
    className,
    Label,
    Header,
    Content,
    lock,
    style,
    onLoadingQueries
  } = props;

  const {open, openForm, closeForm} = props;

  const poHeader = Header
    ? <PopoverHeader>
        <Header></Header>
      </PopoverHeader>
    : null;

  const triggerCompId = componentid.safeId() + "_trigger";

  const loading = (<button disabled={true} className={"btn " + className}>
    <LoadingIcon></LoadingIcon>
  </button>);

  const content = (<React.Fragment>
    <LoadingButton style={style} componentid={triggerCompId} className={(
        className
        ? className
        : " btn-secondary ") + " btn-xs"} onClick={(e) => {
        openForm();
      }}>
      <Label></Label>
    </LoadingButton>
    <Popover placement="bottom" isOpen={open} target={triggerCompId}>
      {poHeader}
      <PopoverBody>
        <Content closeForm={closeForm}></Content>
      </PopoverBody>
    </Popover>
  </React.Fragment>);

  if (onLoadingQueries) {
    return (<InProgress onLoadingQueries={onLoadingQueries} loading={loading} content={content}></InProgress>);
  } else {
    return content;
  }

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
  Comp as OperationPopover
};
