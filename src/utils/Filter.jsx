import React from "react";
import {Form, FormExternalConnector, FormConnector} from '@nebulario/tracker-app-form'
import {compose, lifecycle} from 'recompose';
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';

export const filterUnion = (items, filters) => {

  let active = false;

  const filterResults = _.map(filters, f => {

    if (f.active) {
      active = true;
      return _.map(_.filter(items, o => f.filter(o)), fm => fm.id);
    } else {
      return []
    }
  });

  if (!active) {
    return _.map(items, m => m.id);
  } else {
    return _.uniq(_.reduce(filterResults, (res, v) => {
      return [
        ...res,
        ...v
      ]
    }, []));
  }

}

const PureCheckFilter = (props) => {
  // Check thde device

  const {componentid, fields, propsName, component: filters, setFormField} = props;

  return (<Form propsName={propsName} componentid={componentid}>

    {
      _.map(fields, ({field, label, initial}) => {

        let val = initial;

        if (filters !== undefined && filters[field] !== undefined) {
          val = filters[field]
        }
        return (<FormGroup key={field} check={true}>
          <Label check={true}>
            <Input checked={val} onChange={e => {

                setFormField(componentid, field, e.target.checked)
              }} type="checkbox"/>{' '}
            {label}
          </Label>
        </FormGroup>);
      })
    }

  </Form>);
}

//

export const getCheckFilterValues = (fields, props, propsName) => {
  const filters = props[propsName];

  return _.reduce(fields, (res, v, k) => {
    res[v.field] = v.initial;
    if (filters !== undefined && filters[v.field] !== undefined) {
      res[v.field] = filters[v.field];
    }

    return res;
  }, {});

}

export const CheckFilter = compose(
/**/
FormConnector
/**/)(PureCheckFilter)

export const CheckFilterConnector = ({connectToId, mapToProps}) => FormExternalConnector({connectToId, mapToProps});
