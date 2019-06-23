import now from 'performance-now';
import {handleActions} from 'redux-actions';
import * as Event from './actions'

export const reducers = handleActions({
  [Event.onStreamEvents]: (state, {
    payload: {
      stream,
      events
    }
  }) => {

    //console.log("STREAM FROM CURRENT: " + stream)

    const currState = {
      ...state
    };
    currState.streams = {
      ...currState.streams
    };

    currState.streams[stream] = {
      ...(currState.streams[stream] || {
        events: []
      })
    }
    const currStream = currState.streams[stream];
    currStream.events = [...currStream.events];

    for (const ev of events) {

      //console.log("--EVENT--");
      //console.log(ev);
      const {eventid, event, timestamp, payload, keyid} = ev;

      if (!keyid || !_.find(currStream.events, {keyid})) {
        currStream.events.push({
          id: eventid,
          eventid,
          event,
          timestamp,
          payload,
          keyid
        });

      }

    }

    return currState;
  },
  [Event.onEventHandled]: (state, {
    payload: {
      stream,
      eventid
    }
  }) => {

    const currState = {
      ...state
    };
    currState.streams = {
      ...currState.streams
    };

    currState.streams[stream] = {
      ...currState.streams[stream]
    }
    const currStream = currState.streams[stream];
    currStream.events = [...currStream.events];

    const removedHandled = currStream.events;
    const idx = _.findIndex(removedHandled, {eventid});

    if (idx !== -1) {
      removedHandled.splice(idx, 1);
    }

    return currState;
  }
}, {streams: {}});
