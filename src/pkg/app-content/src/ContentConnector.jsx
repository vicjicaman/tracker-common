import React from "react";
import _ from "lodash";
import {connect} from 'react-redux';
import * as Actions from './state/actions'

const mapDispatchToProps = (dispatch, {componentid}) => {

  return ({
    setSection: function(section) {
      dispatch(Actions.onChangeSection({componentid, section}))
    },
    setComponentSection: function({componentid, section}) {
      dispatch(Actions.onChangeSection({componentid, section}))
    },
    setWindowMode: function(mode) {
      dispatch(Actions.onChangeWindowMode({componentid, mode}))
    },
    setComponentWindowMode: function({componentid, mode}) {
      dispatch(Actions.onChangeWindowMode({componentid, mode}))
    }
  })
}

const mapStateToProps = (state, {componentid}) => {
  return {component: state.app.content[componentid]};
};

export const ContentActionConnector = connect(null, mapDispatchToProps);
export const ContentConnector = connect(mapStateToProps, mapDispatchToProps);
