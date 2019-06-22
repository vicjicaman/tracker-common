import gql from 'graphql-tag';

export const GeneralFragment = gql `
  fragment StreamGeneralFragment on Stream {
    id
    streamid
    name
    type
    frames {
      frameid
      data
      label
      type
      addedOn
    }
  }
`


export const StreamQuery = gql `query StreamQuery ($streamid:String!)
{
  viewer {
    id
    system {
      streams {
        stream(streamid:$streamid) {
          ...StreamGeneralFragment
        }
      }
    }
  }
}
${GeneralFragment}
`;
