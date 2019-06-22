import React from "react";
import _ from "lodash";
import {compose} from 'recompose';
import {CustomInput, Form, FormGroup, Label} from 'reactstrap';

export const FiltersPure = (props) => {
  const {componentid, items, filters, listState, changeFilter} = props;

  if (!listState) {
    return null;
  }

  return (<Form>
    <FormGroup>
      <div>
        {
          _.map(filters, ({
            filterid,
            label
          }, i) => (<CustomInput type="checkbox" checked={listState.filters[filterid].active} onChange={e => {
          
              changeFilter(filterid, e.target.checked)
            }} id={componentid + "_" + i} label={label} inline={true}/>))
        }
      </div>
    </FormGroup>
  </Form>);
};

const Comp = compose(
/**/)(FiltersPure);
export {
  Comp as ListFilter
};
