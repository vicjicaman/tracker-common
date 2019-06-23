import gql from 'graphql-tag';
import {RegisterQuery} from 'PKG/app-query/src'
import {WorkspaceFragment} from 'Queries/workspace'
import * as Workspace from './workspaces'

export const RootWorkspaceFragment = gql `
  fragment RootWorkspaceFragment on Workspace {
    ...WorkspaceFragment
  }
  ${WorkspaceFragment}
`;

RegisterQuery(gql `query RootWorkspaceQuery ($workspaceid:String!)
{
  viewer {
    id
    workspaces {
      workspace (workspaceid:$workspaceid){
        ...RootWorkspaceFragment
      }
    }
  }
}
${RootWorkspaceFragment}
`, {fragment: "RootWorkspacesQuery"});

RegisterQuery(gql `query RootWorkspacesQuery
{
  viewer {
    id
    workspaces {
      list {
        ...RootWorkspaceFragment
      }
    }
  }
}
${RootWorkspaceFragment}
`);
