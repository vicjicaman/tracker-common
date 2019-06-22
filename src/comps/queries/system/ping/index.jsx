import gql from 'graphql-tag';
import {RegisterQuery} from 'PKG/app-query/src'

RegisterQuery(gql `query PingQuery ($type:String!, $params: JSON!)
{
  viewer {
    id
    system {
      ping (type: $type, params:$params)
    }
  }
}

`);
