import gql from 'graphql-tag';
import {RegisterQuery} from '@nebulario/tracker-app-query'

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
