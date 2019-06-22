import React from "react";
import {compose, lifecycle} from 'recompose';
import {EventConnector} from '../../app-event/src'
import {ID} from '../id'

/*export const CommandActionConnector = EventActionConnector({
  name: "commands",
  stream: () => ["commands"]
});*/

export const getQueryCommands = (events, eventName, handlerEntities) => {

  const filtered = _.filter(events, ({
    event,
    payload: {
      ownerid: evOwnerid,
      queryid: evQueryid
    }
  }) => {

    let matchEntity = _.find(handlerEntities, (ent) => (evOwnerid === ID(ent.ownerid) && ent.queries.includes(evQueryid)));

    return (event === eventName && matchEntity);
  });

  return filtered;
}

const handleCommands = function(comp, cmdHandlerEntities, cmdQueryHandlers) {

  const {commandsHandleEvent, commandsStream, isLocked} = comp.props;

  //console.log("COMPONENT NEW EVENTS");

  if (commandsStream) {

    //console.log(commandsStream.events)

    const refetchMatched = getQueryCommands(commandsStream.events, "refetch", cmdHandlerEntities);

    //console.log("PENDING TO REFETCH IN CURRENT");
    //console.log(refetchMatched);

    if (refetchMatched.length > 0) {
      for (const evtf of refetchMatched) {
        const {
          payload: {
            ownerid,
            queryid
          }
        } = evtf;

        const handler = cmdQueryHandlers[queryid];

        handler(evtf);

        commandsHandleEvent(evtf.eventid);
      }

    }

  }

}

export const CommandHandler = ({entities, handlers}) => compose(
/**/
EventConnector({
  name: "commands",
  stream: () => ["commands"]
}),
/**/
lifecycle({
  componentDidMount() {
    handleCommands(this, entities(this.props), handlers(this.props));
  },
  componentDidUpdate(prevProps) {
    handleCommands(this, entities(this.props), handlers(this.props));
  }
}));
