import React from "react";
import {Mutation} from "react-apollo";
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';
import {LoadingButton} from '@nebulario/tracker-app-ui'
import {Actions, Queries} from 'PKG/app-operation/src'

export const Remove = (props) => {
  const {componentid, operationid, style, onClick} = props;

  return (<Mutation mutation={Actions.ChangeVisibilityMutation} onCompleted={(mutationData) => {}} onDone={(data) => {}} onError={(cache, res) => {
      onError && onError(op)
    }}>
    {
      (mutationHandler, {data, loading, error}) => {

        return <LoadingButton componentid={componentid} style={style} loading={loading} onClick={function(e) {

            mutationHandler({
              variables: {
                operationid,
                type: "hidden",
                config:{}
              },
              update: function(store, {data: mutationData}) {
                //console.log(data)
                //const operation = getOperation(mutationData);
                //const data = store.readQuery({query: OperationsQuery});
                //data.viewer.system.operations.list.push(operation);
                //store.writeQuery({query: OperationsQuery, data});

                //console.log(JSON.stringify())
                //setOperationId(operation.operationid)

              },
              refetchQueries: [
                {
                  query: Queries.Query
                }
              ]
            });
            onClick && onClick(e)
          }} className={"btn-xs btn-danger"}>
          <i className="fa fa-times"></i>
        </LoadingButton>
      }
    }
  </Mutation>)

}
