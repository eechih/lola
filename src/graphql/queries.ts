/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
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
      image
      status
      images {
        items {
          id
          url
          createdAt
          updatedAt
          productImagesId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
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
        image
        status
        images {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
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
        image
        status
        images {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
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
        image
        status
        images {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      url
      createdAt
      updatedAt
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
          image
          status
          createdAt
          updatedAt
          owner
        }
        url
        createdAt
        updatedAt
        productImagesId
        owner
      }
      nextToken
    }
  }
`;
