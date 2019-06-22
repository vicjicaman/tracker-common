import React from "react";
import _ from 'lodash'
import {compose, lifecycle} from 'recompose';
import {Query, ApolloConsumer} from "react-apollo";
import {getRegisterQuery} from './QueryManager'
import {QueryConnector} from './QueryConnector'
import {QueryNoDataRefetch, handleQueryResult, filterByQuery, findQueryParams} from './utils'
/** t
(props) => (<PreComp {...props} data={data} refetch={refetch}/>)
**/

const handleRefetch = (comp) => {
  const {
    data,
    QueryRefetch,
    QueryRefetched,
    QueryRefetchFailed,
    client,
    queriesToRefetch,
    queryid,
    variables,
    refetcher = () => []
  } = comp.props;

  const mountedQuery = findQueryParams(queriesToRefetch, {queryid, variables});

  if (queryid !== "PingQuery" && mountedQuery === null) {
    QueryRefetched({queryid, variables});
  }

  const totalToRefetch = [
    {
      queryid,
      variables
    },
    ...(
      refetcher
      ? refetcher(data.data)
      : [])
  ];

  for (const queryInfo of totalToRefetch) {
    const {queryid, variables} = queryInfo;

    /*console.log("queryInfo")
    console.log(queryInfo)
    console.log("queriesToRefetch");
    console.log(queriesToRefetch);*/

    const pendingMatch = filterByQuery(queriesToRefetch, {queryid, variables});

    for (const pending of pendingMatch) {

      if (pending.status === "started") {
        QueryRefetch(pending);
        const query = getRegisterQuery(pending.queryid);

        client.query({fetchPolicy: "network-only", query, variables: pending.variables}).then(function(value) {
          QueryRefetched(pending);
        }).catch(e => {
          QueryRefetchFailed(pending);
          console.log(pending.queryid + ' query refetch error: ' + e);
        });

      }

    }

  }

}

/* pisca de canela, toyouist y a lado de toyouist  --  cocoliche */

const NoDataComp = compose(
/**/
QueryNoDataRefetch,
/**/
QueryConnector,
/**/
lifecycle({
  /**/
  componentDidMount() {
    handleRefetch(this);
  },
  /**/
  componentDidUpdate(prevProps) {
    handleRefetch(this);
  }
}))(({children}) => children);

export const PureComp = (props) => {
  const {
    queryid,
    variables,
    children: Component,
    client,
    refetcher,
    fetchPolicy,
    pollInterval,
    context
  } = props;

  const query = getRegisterQuery(queryid);
  return (<Query query={query} variables={variables} pollInterval={pollInterval} fetchPolicy={fetchPolicy}>
    {
      (data) => {

        const dataProps = {
          data,
          client,
          queryid,
          variables,
          refetcher
        };

        return handleQueryResult(data, () => (<NoDataComp {...dataProps}>
          <Component {...data} context={context}/>
        </NoDataComp>))
      }
    }
  </Query>);
}

/*const clearRefetch = (comp) => {
  const {queriesToRefetch, QueryRefetch, queryid, variables} = comp.props;

  const pendingMatch = filterByQuery(queriesToRefetch, {queryid, variables});

  for (const pending of pendingMatch) {
    if (pending.status === "started") {
      QueryRefetch(pending);
    }
  }

  QueryConnector,
  lifecycle({
    componentDidMount() {
      clearRefetch(this);
    },
    componentDidUpdate(prevProps) {
      clearRefetch(this);
    }
  })


}*/

const Comp = compose(
/**/
/**/)(PureComp);

const ClientComp = (props) => {
  return (<ApolloConsumer>
    {
      client => {
        return <Comp {...props} client={client}></Comp>
      }
    }</ApolloConsumer>);
}

export {
  ClientComp as Query
}
