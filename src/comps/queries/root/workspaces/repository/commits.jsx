import gql from 'graphql-tag';
import {RegisterQuery} from '@nebulario/tracker-app-query'
import * as NamespaceQueries from 'Queries/namespace'
import {WorkspaceFragment} from 'Queries/workspace'

RegisterQuery(gql `query WorkspaceRepositoryCommitsQuery ($workspaceid:String!)
{
  viewer {
    id
    workspaces {
      workspace (workspaceid:$workspaceid){
        ...WorkspaceFragment
        repository {
          ...NamespaceRepositoryFragment
          info {
            branch {
              id
              branchid
              commits {
                list {
                  ...NamespaceCommitFragment
                }
              }
            }
          }
        }
      }
    }
  }
}
${NamespaceQueries.NamespaceCommitFragment}
${WorkspaceFragment}
${NamespaceQueries.NamespaceRepositoryFragment}
`);
