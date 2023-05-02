/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const speakTranslatedImageText = /* GraphQL */ `
  query SpeakTranslatedImageText($input: SpeakTranslatedImageTextInput!) {
    speakTranslatedImageText(input: $input)
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const listProductsByStatus = /* GraphQL */ `
  query ListProductsByStatus(
    $status: ProductStatus!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsByStatus(
      status: $status
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getProductSpecGroup = /* GraphQL */ `
  query GetProductSpecGroup($id: ID!) {
    getProductSpecGroup(id: $id) {
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
export const listProductSpecGroups = /* GraphQL */ `
  query ListProductSpecGroups(
    $filter: ModelProductSpecGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductSpecGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
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
      nextToken
      startedAt
    }
  }
`;
export const syncProductSpecGroups = /* GraphQL */ `
  query SyncProductSpecGroups(
    $filter: ModelProductSpecGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProductSpecGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
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
      nextToken
      startedAt
    }
  }
`;
export const getProductSpecification = /* GraphQL */ `
  query GetProductSpecification($id: ID!) {
    getProductSpecification(id: $id) {
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
export const listProductSpecifications = /* GraphQL */ `
  query ListProductSpecifications(
    $filter: ModelProductSpecificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductSpecifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        group {
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
  }
`;
export const syncProductSpecifications = /* GraphQL */ `
  query SyncProductSpecifications(
    $filter: ModelProductSpecificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProductSpecifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        group {
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
  }
`;
export const getImage = /* GraphQL */ `
  query GetImage($id: ID!) {
    getImage(id: $id) {
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
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
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
      nextToken
      startedAt
    }
  }
`;
export const syncImages = /* GraphQL */ `
  query SyncImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncImages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        product {
          id
          name
          description
          price
          cost
          provider
          offShelfTime
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
      nextToken
      startedAt
    }
  }
`;
export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const publishProduct = /* GraphQL */ `
  query PublishProduct($productId: String) {
    publishProduct(productId: $productId)
  }
`;
