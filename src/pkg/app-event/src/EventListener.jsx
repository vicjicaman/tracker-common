import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import merge from 'deepmerge'
import {compose, lifecycle} from 'recompose';
import {connect} from 'react-redux';
import * as Event from './state/actions'
import {ID} from './id'
import _ from "lodash"

const processEventIds = new Set();
export const EventListener = (props) => {

  const {onEvent, children, stream} = props;
  const streamid = ID(stream);

  const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
      addEventState: (data) => {
        dispatch(Event.onStreamEvents(data))
      }
    })
  }

  //const mapStateToProps = (state, ownProps) => ({events: state.app.events.streams[streamid].executions});

  const Handler = compose(
  /**/
  connect(null, mapDispatchToProps),
  /**/
  lifecycle({
    componentDidUpdate() {},
    componentDidMount() {
      const {addEventState} = this.props;

      if (EventSource) {

        //console.log("########################### " + streamid);

        this.source = new EventSource("http://localhost:4000/events/" + streamid);

        this.source.addEventListener('event.' + streamid, function(e) {

          if (e.type === "error") {
            console.log(e);
            return;
          }

          const update = JSON.parse(e.data)
          //console.log(e.data);
          //console.log("###########################");
          //console.log(ev.id + "=>" + ev.event);
          //addEvent(ev.id + " - " + ev.timestamp + " - " + ev.event);

          /*if (!processEventIds.has(ev.id)) {

            //console.log("received events");
            //console.log(e);

            processEventIds.add(ev.id);
*/
          //onEvent && onEvent({}, update)

          /*const {stream, events} = update;

          */

          addEventState(update);
          //        }

        }, false);

        this.source.onerror = function(e) {
          console.log("EventSource failed.");
          console.log(e)
        };
      }
    },
    componentWillUnmount() {
      if (this.source) {
        this.source.close();
      }
    }
  })
  /**/)(({children}) => null)

  return (<Handler></Handler>);
}
