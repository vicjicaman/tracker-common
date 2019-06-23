import gql from 'graphql-tag';
import {RegisterQuery} from 'PKG/app-query/src'
import * as NamespaceQueries from 'Queries/namespace'
import {WorkspaceFragment} from 'Queries/workspace'
import * as Commits from './commits'

RegisterQuery(gql `query WorkspaceRepositoryQuery ($workspaceid:String!)
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
              summary {
                ...NamespaceBranchSummaryFragment
              }
            }
          }
        }
      }
    }
  }
}
${NamespaceQueries.NamespaceBranchSummaryFragment}
${WorkspaceFragment}
${NamespaceQueries.NamespaceRepositoryFragment}
`);
