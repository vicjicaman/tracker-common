import React from "react";
import {compose} from 'recompose';
import {InlineSearchConnector} from './InlineSearchConnector';

const PureComp = (props) => {

  const {componentid, className} = props;
  const {setSearch, setKeyword, component} = props;

  if (!componentid) {
    return <b className="text-danger">INVALID</b>
  }

  let search = "";

  if (component) {
    search = component.search.value;
  }

  return (<form onSubmit={(e) => {
      e.preventDefault();
      setKeyword(search)
    }} className={"form-inline " + className}>
    <input onChange={(e) => {
        setSearch(e.target.value);
      }} value={search} className="form-control input-sm mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>

  </form>);
}

const Comp = compose(
/**/
InlineSearchConnector
/**/)(PureComp);

export {
  Comp as InlineSearch
}
