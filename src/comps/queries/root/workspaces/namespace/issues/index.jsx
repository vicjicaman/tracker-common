import gql from 'graphql-tag';
import {RegisterQuery} from 'PKG/app-query/src'
import {WorkspaceFragment} from 'Queries/workspace'
import {NamespaceIssueFragment} from 'Queries/workspace/namespace/issue'
import * as Issue from './issue'

export const WorkspaceNamespaceIssuesEntityFragment = gql `
  fragment WorkspaceNamespaceIssuesEntityFragment on NamespaceIssue {
    ...NamespaceIssueFragment
  }
  ${NamespaceIssueFragment}
`;
RegisterQuery(gql `query WorkspaceIssuesEntityQuery ($workspaceid:String!, $issueid: String!)
{
  viewer {
    id
    workspaces {
      workspace (workspaceid:$workspaceid){
        ...WorkspaceFragment
        namespace {
          issues {
            issue (issueid:$issueid) {
              ...WorkspaceNamespaceIssuesEntityFragment
            }
          }
        }
      }
    }
  }
}
${WorkspaceFragment}
${WorkspaceNamespaceIssuesEntityFragment}
`);

RegisterQuery(gql `query WorkspaceIssuesQuery ($workspaceid:String!)
{
  viewer {
    id
    workspaces {
      workspace (workspaceid:$workspaceid){
        ...WorkspaceFragment
        namespace {
          issues {
            list {
              ...WorkspaceNamespaceIssuesEntityFragment
            }
          }
        }
      }
    }
  }
}
${WorkspaceFragment}
${WorkspaceNamespaceIssuesEntityFragment}
`);
