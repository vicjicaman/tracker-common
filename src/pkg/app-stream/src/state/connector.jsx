import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './actions'

const mapDispatchToProps = function(dispatch, {componentid}) {
  return ({
    initStream: function({streamid, frames}) {
      dispatch(Actions.onStreamInit({streamid, frames}))
    },
    removeStream: function({streamid}) {
      dispatch(Actions.onStreamRemove({streamid}))
    },
    addStreamFrame: function(streamid, frame) {
      dispatch(Actions.onStreamFrame({streamid, frame}))
    },
    setStreamCanvasPosition: function(position) {
      dispatch(Actions.onStreamCanvasPosition({componentid, position}))
    }
  })
}

const mapStateToProps = function(state, {componentid, stream: {
    streamid
  }}) {
  return {
    realtimeStream: state.app.stream.streams[streamid],
    canvas: state.app.stream.canvas[componentid]
      ? state.app.stream.canvas[componentid]
      : {
        position: -1
      }
  };
};

export const StreamConnector = connect(mapStateToProps, mapDispatchToProps);
export const StreamActionConnector = connect(null, mapDispatchToProps);
