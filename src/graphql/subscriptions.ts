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
      specGroups {
        items {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupsId
          owner
        }
        nextToken
        startedAt
      }
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
      provider
      offShelfTime
      publishTime
      status
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
      specGroups {
        items {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupsId
          owner
        }
        nextToken
        startedAt
      }
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
      provider
      offShelfTime
      publishTime
      status
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
      specGroups {
        items {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupsId
          owner
        }
        nextToken
        startedAt
      }
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
      provider
      offShelfTime
      publishTime
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onCreateProductSpecGroup = /* GraphQL */ `
  subscription OnCreateProductSpecGroup(
    $filter: ModelSubscriptionProductSpecGroupFilterInput
    $owner: String
  ) {
    onCreateProductSpecGroup(filter: $filter, owner: $owner) {
      id
      product {
        id
        name
        description
        price
        cost
        specGroups {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        provider
        offShelfTime
        publishTime
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      name
      specifications {
        items {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupSpecificationsId
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
      productSpecGroupsId
      owner
    }
  }
`;
export const onUpdateProductSpecGroup = /* GraphQL */ `
  subscription OnUpdateProductSpecGroup(
    $filter: ModelSubscriptionProductSpecGroupFilterInput
    $owner: String
  ) {
    onUpdateProductSpecGroup(filter: $filter, owner: $owner) {
      id
      product {
        id
        name
        description
        price
        cost
        specGroups {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        provider
        offShelfTime
        publishTime
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      name
      specifications {
        items {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupSpecificationsId
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
      productSpecGroupsId
      owner
    }
  }
`;
export const onDeleteProductSpecGroup = /* GraphQL */ `
  subscription OnDeleteProductSpecGroup(
    $filter: ModelSubscriptionProductSpecGroupFilterInput
    $owner: String
  ) {
    onDeleteProductSpecGroup(filter: $filter, owner: $owner) {
      id
      product {
        id
        name
        description
        price
        cost
        specGroups {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        provider
        offShelfTime
        publishTime
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      name
      specifications {
        items {
          id
          name
          description
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          productSpecGroupSpecificationsId
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
      productSpecGroupsId
      owner
    }
  }
`;
export const onCreateProductSpecification = /* GraphQL */ `
  subscription OnCreateProductSpecification(
    $filter: ModelSubscriptionProductSpecificationFilterInput
    $owner: String
  ) {
    onCreateProductSpecification(filter: $filter, owner: $owner) {
      id
      group {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
          publishTime
          status
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        name
        specifications {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        productSpecGroupsId
        owner
      }
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productSpecGroupSpecificationsId
      owner
    }
  }
`;
export const onUpdateProductSpecification = /* GraphQL */ `
  subscription OnUpdateProductSpecification(
    $filter: ModelSubscriptionProductSpecificationFilterInput
    $owner: String
  ) {
    onUpdateProductSpecification(filter: $filter, owner: $owner) {
      id
      group {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
          publishTime
          status
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        name
        specifications {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        productSpecGroupsId
        owner
      }
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productSpecGroupSpecificationsId
      owner
    }
  }
`;
export const onDeleteProductSpecification = /* GraphQL */ `
  subscription OnDeleteProductSpecification(
    $filter: ModelSubscriptionProductSpecificationFilterInput
    $owner: String
  ) {
    onDeleteProductSpecification(filter: $filter, owner: $owner) {
      id
      group {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
          publishTime
          status
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        name
        specifications {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        productSpecGroupsId
        owner
      }
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      productSpecGroupSpecificationsId
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
        specGroups {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        provider
        offShelfTime
        publishTime
        status
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
        specGroups {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        provider
        offShelfTime
        publishTime
        status
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
        specGroups {
          nextToken
          startedAt
        }
        images {
          nextToken
          startedAt
        }
        provider
        offShelfTime
        publishTime
        status
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
