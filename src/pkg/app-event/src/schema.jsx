import _ from 'lodash'
import {EVENTS_QUERY} from './queries'

const schema = [`

  type Event {
    id: String!
    event: String!
    module: String
    data: String
  }

  type EventMutations {
    eventAdd(id: String!, event: String!, module: String, data: String): Event!
  }

  `];

const resolver = {
  //EventMutations: {
  eventAdd: (parent, {
    id,
    event,
    module,
    data
  }, {cache}) => {

    const newEvent = {
      __typename: "Event",
      id,
      event,
      module,
      data

    };

    const previousEvents = cache.readQuery({query: EVENTS_QUERY});

    // check the device check thde device
    previousEvents.events.unshift(newEvent)
    const mutData = {
      events: [...previousEvents.events]
    };
    cache.writeData({data: mutData});
    return newEvent;
  }
  //}
};

export {
  schema,
  resolver
};
