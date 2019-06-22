import React from "react";
import _ from "lodash";
import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import {ID} from './id'
import * as Event from './state/actions'

const streamKey = s => s + "Stream"

export const EventConnector = ({name, stream}) => {

  const mapDispatchToProps = (dispatch, ownProps) => {
    const streamid = ID(stream(ownProps))

    return ({
      [name + "HandleEvent"]: (eventid) => {
        dispatch(Event.onEventHandled({stream: streamid, eventid}))
      }
    });
    // Check the device
  }

  const mapStateToProps = (state, ownProps) => {
    const streamid = ID(stream(ownProps))

    return {
      [streamKey(name)]: state.app.events.streams[streamid]
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)
}


/*
export const EventActionConnector = ({name, stream}) => {



  return connect(null, mapDispatchToProps)
}
*/
