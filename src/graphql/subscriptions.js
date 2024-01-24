/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserLists = /* GraphQL */ `
  subscription OnCreateUserLists(
    $filter: ModelSubscriptionUserListsFilterInput
    $owner: String
  ) {
    onCreateUserLists(filter: $filter, owner: $owner) {
      id
      shoppingList
      wishList
      currentSession
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUserLists = /* GraphQL */ `
  subscription OnUpdateUserLists(
    $filter: ModelSubscriptionUserListsFilterInput
    $owner: String
  ) {
    onUpdateUserLists(filter: $filter, owner: $owner) {
      id
      shoppingList
      wishList
      currentSession
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUserLists = /* GraphQL */ `
  subscription OnDeleteUserLists(
    $filter: ModelSubscriptionUserListsFilterInput
    $owner: String
  ) {
    onDeleteUserLists(filter: $filter, owner: $owner) {
      id
      shoppingList
      wishList
      currentSession
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
