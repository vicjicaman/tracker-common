const EVENT_LISTENERS = [];

export const onEventListener = (operationid, event, handler) => {
  EVENT_LISTENERS.push({operationid, event, handler});
}

export const HandleListeners = (operationid, evt) => {

  //console.log("LISTENERS")
  //console.log(evt)

  for (const ls of EVENT_LISTENERS) {

    const idx = _.findIndex(EVENT_LISTENERS, ls => ls.operationid === operationid && ls.event === evt.event);

    //console.log("REMOVE LISTENER " + idx);
    if (idx !== -1) {
      EVENT_LISTENERS[idx].handler(evt);
      EVENT_LISTENERS.splice(idx, 1);
    }

  }
}
