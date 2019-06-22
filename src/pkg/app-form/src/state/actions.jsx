import {createAction} from 'redux-actions';

export const onInit = createAction('FORM_INIT');
export const onChangeField = createAction('CHANGE_FORM_FIELD');
export const onSubmit = createAction('FORM_SUBMIT');
export const onSubmitHandled = createAction('FORM_SUBMIT_HANDLED');
export const onTouchForm = createAction('TOUCH_FORM');
