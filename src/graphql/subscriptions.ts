/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onCreateProduct(filter: $filter, owner: $owner) {
      id
      name
      description
      price
      cost
      image
      status
      images {
        items {
          id
          url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productImagesId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onUpdateProduct(filter: $filter, owner: $owner) {
      id
      name
      description
      price
      cost
      image
      status
      images {
        items {
          id
          url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productImagesId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onDeleteProduct(filter: $filter, owner: $owner) {
      id
      name
      description
      price
      cost
      image
      status
      images {
        items {
          id
          url
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productImagesId
          owner
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage(
    $filter: ModelSubscriptionImageFilterInput
    $owner: String
  ) {
    onCreateImage(filter: $filter, owner: $owner) {
      id
      product {
        id
        name
        description
        price
        cost
        image
        status
        images {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productImagesId
      owner
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage(
    $filter: ModelSubscriptionImageFilterInput
    $owner: String
  ) {
    onUpdateImage(filter: $filter, owner: $owner) {
      id
      product {
        id
        name
        description
        price
        cost
        image
        status
        images {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productImagesId
      owner
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage(
    $filter: ModelSubscriptionImageFilterInput
    $owner: String
  ) {
    onDeleteImage(filter: $filter, owner: $owner) {
      id
      product {
        id
        name
        description
        price
        cost
        image
        status
        images {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      url
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productImagesId
      owner
    }
  }
`;
