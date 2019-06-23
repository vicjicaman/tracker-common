import gql from 'graphql-tag';
import {RegisterQuery} from 'PKG/app-query/src'
import {WorkspaceFragment} from 'Queries/workspace'
import {NamespaceIssueFragment} from 'Queries/workspace/namespace/issue'

export const WorkspaceNamespaceIssueFragment = gql `
  fragment WorkspaceNamespaceIssueFragment on NamespaceIssue {
    ...NamespaceIssueFragment
    comments {
      id
      commentid,
      comment,
      created,
      author,
      entity {
        branch {
          remote
        }
      }
    }
  }
  ${NamespaceIssueFragment}
`;

RegisterQuery(gql `query WorkspaceIssueQuery ($workspaceid:String!, $issueid: String!)
{
  viewer {
    id
    workspaces {
      workspace (workspaceid:$workspaceid){
        ...WorkspaceFragment
        namespace {
          issues {
            issue (issueid:$issueid) {
              ...WorkspaceNamespaceIssueFragment
            }
          }
        }
      }
    }
  }
}
${WorkspaceFragment}
${WorkspaceNamespaceIssueFragment}
`);
