import _ from 'lodash'
import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Actions from './actions'

export const reducers = handleActions({
  [Actions.onStreamCanvasPosition]: (state, {
    payload: {
      componentid,
      position
    }
  }) => {

    const currState = {
      ...state,
      canvas: {
        ...state.canvas
      }
    };
    const currCanvas = currState.canvas;

    if (!currCanvas[componentid]) {
      currCanvas[componentid] = {
        position: -1
      }
    }

    currCanvas[componentid] = {
      ...currCanvas[componentid],
      position
    }

    return currState;
  },
  //////////////////////////////////////////////////////////////////////////////////
  [Actions.onStreamInit]: (state, {
    payload: {
      streamid,
      frames
    }
  }) => {
    const currState = {
      ...state,
      streams: {
        ...state.streams
      }
    };
    const currStreams = currState.streams;

    if (currStreams[streamid]) {
      return state;
    }

    currStreams[streamid] = {
      frames: [...frames]
    };
    currStreams[streamid].frames.reverse();

    return currState;
  },
  [Actions.onStreamRemove]: (state, {payload: {
      streamid
    }}) => {
    const currState = {
      ...state,
      streams: {
        ...state.streams
      }
    };
    const currStreams = currState.streams;
    delete currStreams[streamid];
    return currState;
  },
  [Actions.onStreamFrame]: (state, {
    payload: {
      streamid,
      frame
    }
  }) => {
    const currState = {
      ...state,
      streams: {
        ...state.streams
      }
    };
    const currStreams = currState.streams;
    if (!currStreams[streamid]) {
      return state;
    }

    currStreams[streamid] = {
      ...currStreams[streamid]
    };
    const currStream = currStreams[streamid];

    currStream.frames = [...currStream.frames];
    currStream.frames.push(frame);

    return currState;
  }
}, {
  streams: {},
  canvas: {}
});
