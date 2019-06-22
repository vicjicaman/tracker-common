import * as Root from '../refetch';


export const refetch = (inp) => {
  return [
    ...Root.refetch(inp)
  ];
}
