import {createAction} from 'redux-actions';

export const onStreamInit = createAction('STREAM_INIT');
export const onStreamRemove = createAction('STREAM_REMOVE');
export const onStreamFrame = createAction('STREAM_FRAME');

export const onStreamCanvasPosition = createAction('STREAM_CANVAS_POSITION');
