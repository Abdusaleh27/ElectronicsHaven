/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserLists = /* GraphQL */ `
  query GetUserLists($id: ID!) {
    getUserLists(id: $id) {
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
export const listUserLists = /* GraphQL */ `
  query ListUserLists(
    $filter: ModelUserListsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shoppingList
        wishList
        currentSession
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
