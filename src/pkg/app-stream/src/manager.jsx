import React from "react";
import _ from 'lodash'
import {compose, lifecycle, withStateHandlers} from 'recompose';
import {EventConnector} from '../../app-event/src'
import {StreamActionConnector} from './state/connector'

const handleStreamCommands = function(comp) {

  const {commandsHandleEvent, commandsStream, addStreamFrame} = comp.props;

  if (commandsStream) {

    for (const evtf of commandsStream.events) {
      const {eventid, event, payload} = evtf;

      if (event === "stream.frame") {
        commandsHandleEvent(eventid);
        const {streamid, frame} = payload;
        addStreamFrame(streamid, frame);
      }

    }

  }

}

export const PureComp = () => {
  return null;
}

const Comp = compose(
/**/
EventConnector({
  name: "commands",
  stream: () => ["commands"]
}),
/**/
StreamActionConnector,
/**/
lifecycle({
  /**/
  componentDidMount() {
    handleStreamCommands(this);
  },
  /**/
  componentDidUpdate(prevProps) {
    handleStreamCommands(this, prevProps);
  }
})
/**/)(PureComp);

export {
  Comp as StreamManager
}
