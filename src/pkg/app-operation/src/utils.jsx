import React from "react";
import _ from "lodash"
import {ExtFormConnector} from '@nebulario/tracker-app-form'

export const OperationFormConnected = ExtFormConnector((props) => {
  const {
    OperationButton,
    componentid,
    form,
    closeModal,
    touchForm,
    className,
    validator
  } = props;

  let validation = {};
  let isValid = false;
  let values = {};
  if (form) {
    values = _.reduce(form.values, (res, val, key) => {
      res[key] = val.value;
      return res;
    }, {})

    validation = validator.validate(values);
    isValid = validation.isValid;
  }

  return (<OperationButton className={className} isValid={isValid} validation={validation} values={values} componentid={componentid + "_form_operation"} onClick={(e) => {
      e.preventDefault();
      if (validation.isValid) {
        closeModal();
      } else {
        touchForm();
      }
    }}></OperationButton>);
});

export const findQuery = (queries, {
  queryid: toFindQueryid,
  variables: toFindVariables
}) => {

  return _.find(queries, ({queryid, variables}) => {
    let varsMatch = true;

    for (const v in toFindVariables) {
      if (toFindVariables[v] !== variables[v]) {
        varsMatch = false;
      }
    }

    return queryid === toFindQueryid && varsMatch;
  })

}

export const isLocked = (lock, operations) => {
  if (!lock) {
    return false;
  }

  const {type, resources} = lock;

  for (const op of operations) {
    const {lock: opLock} = op;

    if (opLock) {
      const {type: opType, resources: opResources} = opLock;

      if (opType !== type) {
        continue;
      }

      let includedRes = false;

      for (const res of resources) {
        if (opResources.includes(res)) {
          includedRes = true;
          break;
        }
      }

      if (opType === type && includedRes) {
        return true;
      }
    }

  }

  return false;
}
