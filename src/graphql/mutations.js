/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserLists = /* GraphQL */ `
  mutation CreateUserLists(
    $input: CreateUserListsInput!
    $condition: ModelUserListsConditionInput
  ) {
    createUserLists(input: $input, condition: $condition) {
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
export const updateUserLists = /* GraphQL */ `
  mutation UpdateUserLists(
    $input: UpdateUserListsInput!
    $condition: ModelUserListsConditionInput
  ) {
    updateUserLists(input: $input, condition: $condition) {
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
export const deleteUserLists = /* GraphQL */ `
  mutation DeleteUserLists(
    $input: DeleteUserListsInput!
    $condition: ModelUserListsConditionInput
  ) {
    deleteUserLists(input: $input, condition: $condition) {
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
