import React from "react";
import {Mutation} from "react-apollo";
import {LoadingIcon, LoadingButton} from '../../../app-ui/src';
import {ID} from '../../id'

export const OperationAction = ({
  disabled,
  operation,
  variables,
  mutation,
  Label,
  className,
  onError,
  path,
  updateOperations
}) => {

  const {operationid} = operation;

  return (<Mutation mutation={mutation} onError={(cache, res) => {
      onError && onError(op)
    }}>
    {
      (mutationHandler, {data, loading, error}) => {

        return <LoadingButton disabled={disabled} onClick={e => {
            mutationHandler({
              /**/
              optimisticResponse: {
                __typename: "Mutation",
                viewer: {
                  __typename: "ViewerMutations",
                  local: {
                    __typename: "LocalMutations",
                    operation: {
                      __typename: "OperationMutations",
                      ...path({operation})
                    }
                  }
                }
              },
              /**/
              variables: {
                operationid
              },
              update: (store, {
                data: {
                  viewer: {
                    local: {
                      operation: {
                        stop: operation
                      }
                    }
                  }
                }
              }) => {

                updateOperations && updateOperations(store, operation)

              }
            });
          }} loading={loading} className={"btn-xs " + className}>
          <Label></Label>
        </LoadingButton>

      }
    }
  </Mutation>);
};
