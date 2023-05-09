/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
          key
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
          key
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
          key
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
export const createProductSpecGroup = /* GraphQL */ `
  mutation CreateProductSpecGroup(
    $input: CreateProductSpecGroupInput!
    $condition: ModelProductSpecGroupConditionInput
  ) {
    createProductSpecGroup(input: $input, condition: $condition) {
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
export const updateProductSpecGroup = /* GraphQL */ `
  mutation UpdateProductSpecGroup(
    $input: UpdateProductSpecGroupInput!
    $condition: ModelProductSpecGroupConditionInput
  ) {
    updateProductSpecGroup(input: $input, condition: $condition) {
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
export const deleteProductSpecGroup = /* GraphQL */ `
  mutation DeleteProductSpecGroup(
    $input: DeleteProductSpecGroupInput!
    $condition: ModelProductSpecGroupConditionInput
  ) {
    deleteProductSpecGroup(input: $input, condition: $condition) {
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
export const createProductSpecification = /* GraphQL */ `
  mutation CreateProductSpecification(
    $input: CreateProductSpecificationInput!
    $condition: ModelProductSpecificationConditionInput
  ) {
    createProductSpecification(input: $input, condition: $condition) {
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
export const updateProductSpecification = /* GraphQL */ `
  mutation UpdateProductSpecification(
    $input: UpdateProductSpecificationInput!
    $condition: ModelProductSpecificationConditionInput
  ) {
    updateProductSpecification(input: $input, condition: $condition) {
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
export const deleteProductSpecification = /* GraphQL */ `
  mutation DeleteProductSpecification(
    $input: DeleteProductSpecificationInput!
    $condition: ModelProductSpecificationConditionInput
  ) {
    deleteProductSpecification(input: $input, condition: $condition) {
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
export const createImage = /* GraphQL */ `
  mutation CreateImage(
    $input: CreateImageInput!
    $condition: ModelImageConditionInput
  ) {
    createImage(input: $input, condition: $condition) {
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
      key
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
export const updateImage = /* GraphQL */ `
  mutation UpdateImage(
    $input: UpdateImageInput!
    $condition: ModelImageConditionInput
  ) {
    updateImage(input: $input, condition: $condition) {
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
      key
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
export const deleteImage = /* GraphQL */ `
  mutation DeleteImage(
    $input: DeleteImageInput!
    $condition: ModelImageConditionInput
  ) {
    deleteImage(input: $input, condition: $condition) {
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
      key
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
