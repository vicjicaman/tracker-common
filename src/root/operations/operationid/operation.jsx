import React from "react";
import {compose} from 'recompose';
import gql from 'graphql-tag';
import _ from 'lodash'
import {Query} from "react-apollo";
import {OperationConnector, Queries} from 'PKG/app-operation/src'
import {Content as ContentComp} from 'PKG/app-content/src'
import {StreamCanvas} from 'PKG/app-stream/src'

import * as UI from 'UI/toolbox/system/operation'

export const Operation = compose(OperationConnector)(({componentid, operationid, operationList: list}) => {

  const operation = _.find(list, {operationid})

  if (!operation) {
    return <span>Couldn't find operation {operationid}</span>
  }

  return (<Query query={Queries.OperationQuery} variables={{
      operationid
    }}>
    {
      ({loading, error, data}) => {

        if (!data || loading) {
          return null;
        }

        const {
          viewer: {
            system: {
              operations: {
                operation: {
                  stream
                }
              }
            }
          }
        } = data;

        return (<div className="row">
          <div className="col-12">
            <UI.StatusLabel operation={operation}/><br/>
            <StreamCanvas componentid={stream.streamid} stream={stream}/>
          </div>
        </div>);
      }
    }
  </Query>);
});
