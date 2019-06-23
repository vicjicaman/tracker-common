import React from "react";
import _ from 'lodash';
import {compose, lifecycle, withProps} from 'recompose';
import {FormConnector} from './FormConnector';
import {Form} from 'reactstrap';

class PureComp extends React.Component {

  constructor(props) {
    super(props);
    this.trigger = this.trigger.bind(this);
  }

  trigger() {
    this.form.dispatchEvent(new Event('submit'));
  }

  componentDidMount() {
    const {initial, setForm} = this.props;

    if (initial) {
      setForm(initial);
    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.form && this.props.form.submit === true && !prevProps.form.submit) {
      this.trigger();
      this.props.submitHandled();
    }
  }

  render() {

    const {
      componentid: rawComponentid,
      initial,
      validator,
      className,
      children: Children,
      onSubmit,
      touchForm,
      setFormField,
      submit,
      form,
      attributes
    } = this.props;

    if (!rawComponentid) {
      return <b className="text-danger">INVALID</b>
    }

    if (!form) {
      return null;
    }

    const componentid = rawComponentid.safeId();

    const values = _.reduce(form.values, (res, val, key) => {
      res[key] = val.value;
      return res;
    }, {});

    const validation = validator
      ? validator.validate(values)
      : null;

    return (<form id={componentid} ref={el => this.form = el} onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit(values, form);
        return false;
      }}>
      <Children componentid={rawComponentid} submit={this.props.submit} validation={validation} values={values} fields={form.values} setFormField={setFormField} touchForm={touchForm} attributes={attributes}></Children>
    </form>);
  }
}

//this.refs.form.getDOMNode().dispatchEvent(new Event("submit"));

const Comp = compose(
/**/
FormConnector
/**/)(PureComp);

export {
  Comp as Form
}
