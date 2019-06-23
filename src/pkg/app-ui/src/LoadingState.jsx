import {compose, withStateHandlers} from 'recompose';

export const LoadingState = withStateHandlers(() => ({isLoading: false}), {
  setLoadingState: ({}) => (state) => ({isLoading: state})
})/***/
