/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProductInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  price?: number | null,
  cost?: number | null,
  provider?: string | null,
  offShelfTime?: string | null,
  status: ProductStatus,
  createdAt?: string | null,
  _version?: number | null,
};

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}


export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelIntInput | null,
  cost?: ModelIntInput | null,
  provider?: ModelStringInput | null,
  offShelfTime?: ModelStringInput | null,
  status?: ModelProductStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelProductStatusInput = {
  eq?: ProductStatus | null,
  ne?: ProductStatus | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  description?: string | null,
  price?: number | null,
  cost?: number | null,
  specGroups?: ModelProductSpecGroupConnection | null,
  images?: ModelImageConnection | null,
  provider?: string | null,
  offShelfTime?: string | null,
  status: ProductStatus,
  createdAt?: string | null,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelProductSpecGroupConnection = {
  __typename: "ModelProductSpecGroupConnection",
  items:  Array<ProductSpecGroup | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ProductSpecGroup = {
  __typename: "ProductSpecGroup",
  id: string,
  product?: Product | null,
  name: string,
  specifications?: ModelProductSpecificationConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  productSpecGroupsId?: string | null,
  owner?: string | null,
};

export type ModelProductSpecificationConnection = {
  __typename: "ModelProductSpecificationConnection",
  items:  Array<ProductSpecification | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ProductSpecification = {
  __typename: "ProductSpecification",
  id: string,
  group?: ProductSpecGroup | null,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  productSpecGroupSpecificationsId?: string | null,
  owner?: string | null,
};

export type ModelImageConnection = {
  __typename: "ModelImageConnection",
  items:  Array<Image | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Image = {
  __typename: "Image",
  id: string,
  product?: Product | null,
  url: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  productImagesId?: string | null,
  owner?: string | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  price?: number | null,
  cost?: number | null,
  provider?: string | null,
  offShelfTime?: string | null,
  status?: ProductStatus | null,
  createdAt?: string | null,
  _version?: number | null,
};

export type DeleteProductInput = {
  id: string,
  _version?: number | null,
};

export type CreateProductSpecGroupInput = {
  id?: string | null,
  name: string,
  _version?: number | null,
  productSpecGroupsId?: string | null,
};

export type ModelProductSpecGroupConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelProductSpecGroupConditionInput | null > | null,
  or?: Array< ModelProductSpecGroupConditionInput | null > | null,
  not?: ModelProductSpecGroupConditionInput | null,
  productSpecGroupsId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateProductSpecGroupInput = {
  id: string,
  name?: string | null,
  _version?: number | null,
  productSpecGroupsId?: string | null,
};

export type DeleteProductSpecGroupInput = {
  id: string,
  _version?: number | null,
};

export type CreateProductSpecificationInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  _version?: number | null,
  productSpecGroupSpecificationsId?: string | null,
};

export type ModelProductSpecificationConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProductSpecificationConditionInput | null > | null,
  or?: Array< ModelProductSpecificationConditionInput | null > | null,
  not?: ModelProductSpecificationConditionInput | null,
  productSpecGroupSpecificationsId?: ModelIDInput | null,
};

export type UpdateProductSpecificationInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  _version?: number | null,
  productSpecGroupSpecificationsId?: string | null,
};

export type DeleteProductSpecificationInput = {
  id: string,
  _version?: number | null,
};

export type CreateImageInput = {
  id?: string | null,
  url: string,
  _version?: number | null,
  productImagesId?: string | null,
};

export type ModelImageConditionInput = {
  url?: ModelStringInput | null,
  and?: Array< ModelImageConditionInput | null > | null,
  or?: Array< ModelImageConditionInput | null > | null,
  not?: ModelImageConditionInput | null,
  productImagesId?: ModelIDInput | null,
};

export type UpdateImageInput = {
  id: string,
  url?: string | null,
  _version?: number | null,
  productImagesId?: string | null,
};

export type DeleteImageInput = {
  id: string,
  _version?: number | null,
};

export type SpeakTranslatedImageTextInput = {
  identifyText: SpeakTranslatedImageTextIdentifyTextInput,
  translateText: SpeakTranslatedImageTextTranslateTextInput,
  convertTextToSpeech: SpeakTranslatedImageTextConvertTextToSpeechInput,
};

export type SpeakTranslatedImageTextIdentifyTextInput = {
  key: string,
};

export type SpeakTranslatedImageTextTranslateTextInput = {
  sourceLanguage: string,
  targetLanguage: string,
};

export type SpeakTranslatedImageTextConvertTextToSpeechInput = {
  voiceID: string,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  price?: ModelIntInput | null,
  cost?: ModelIntInput | null,
  provider?: ModelStringInput | null,
  offShelfTime?: ModelStringInput | null,
  status?: ModelProductStatusInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelProductSpecGroupFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelProductSpecGroupFilterInput | null > | null,
  or?: Array< ModelProductSpecGroupFilterInput | null > | null,
  not?: ModelProductSpecGroupFilterInput | null,
  productSpecGroupsId?: ModelIDInput | null,
};

export type ModelProductSpecificationFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelProductSpecificationFilterInput | null > | null,
  or?: Array< ModelProductSpecificationFilterInput | null > | null,
  not?: ModelProductSpecificationFilterInput | null,
  productSpecGroupSpecificationsId?: ModelIDInput | null,
};

export type ModelImageFilterInput = {
  id?: ModelIDInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelImageFilterInput | null > | null,
  or?: Array< ModelImageFilterInput | null > | null,
  not?: ModelImageFilterInput | null,
  productImagesId?: ModelIDInput | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  price?: ModelSubscriptionIntInput | null,
  cost?: ModelSubscriptionIntInput | null,
  provider?: ModelSubscriptionStringInput | null,
  offShelfTime?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionProductSpecGroupFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductSpecGroupFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductSpecGroupFilterInput | null > | null,
};

export type ModelSubscriptionProductSpecificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductSpecificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductSpecificationFilterInput | null > | null,
};

export type ModelSubscriptionImageFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  url?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionImageFilterInput | null > | null,
  or?: Array< ModelSubscriptionImageFilterInput | null > | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateProductSpecGroupMutationVariables = {
  input: CreateProductSpecGroupInput,
  condition?: ModelProductSpecGroupConditionInput | null,
};

export type CreateProductSpecGroupMutation = {
  createProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateProductSpecGroupMutationVariables = {
  input: UpdateProductSpecGroupInput,
  condition?: ModelProductSpecGroupConditionInput | null,
};

export type UpdateProductSpecGroupMutation = {
  updateProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteProductSpecGroupMutationVariables = {
  input: DeleteProductSpecGroupInput,
  condition?: ModelProductSpecGroupConditionInput | null,
};

export type DeleteProductSpecGroupMutation = {
  deleteProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateProductSpecificationMutationVariables = {
  input: CreateProductSpecificationInput,
  condition?: ModelProductSpecificationConditionInput | null,
};

export type CreateProductSpecificationMutation = {
  createProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateProductSpecificationMutationVariables = {
  input: UpdateProductSpecificationInput,
  condition?: ModelProductSpecificationConditionInput | null,
};

export type UpdateProductSpecificationMutation = {
  updateProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteProductSpecificationMutationVariables = {
  input: DeleteProductSpecificationInput,
  condition?: ModelProductSpecificationConditionInput | null,
};

export type DeleteProductSpecificationMutation = {
  deleteProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateImageMutationVariables = {
  input: CreateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type CreateImageMutation = {
  createImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateImageMutationVariables = {
  input: UpdateImageInput,
  condition?: ModelImageConditionInput | null,
};

export type UpdateImageMutation = {
  updateImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteImageMutationVariables = {
  input: DeleteImageInput,
  condition?: ModelImageConditionInput | null,
};

export type DeleteImageMutation = {
  deleteImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type SpeakTranslatedImageTextQueryVariables = {
  input: SpeakTranslatedImageTextInput,
};

export type SpeakTranslatedImageTextQuery = {
  speakTranslatedImageText?: string | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProductsQuery = {
  syncProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ListProductsByStatusQueryVariables = {
  status: ProductStatus,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsByStatusQuery = {
  listProductsByStatus?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetProductSpecGroupQueryVariables = {
  id: string,
};

export type GetProductSpecGroupQuery = {
  getProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListProductSpecGroupsQueryVariables = {
  filter?: ModelProductSpecGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductSpecGroupsQuery = {
  listProductSpecGroups?:  {
    __typename: "ModelProductSpecGroupConnection",
    items:  Array< {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProductSpecGroupsQueryVariables = {
  filter?: ModelProductSpecGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProductSpecGroupsQuery = {
  syncProductSpecGroups?:  {
    __typename: "ModelProductSpecGroupConnection",
    items:  Array< {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetProductSpecificationQueryVariables = {
  id: string,
};

export type GetProductSpecificationQuery = {
  getProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListProductSpecificationsQueryVariables = {
  filter?: ModelProductSpecificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductSpecificationsQuery = {
  listProductSpecifications?:  {
    __typename: "ModelProductSpecificationConnection",
    items:  Array< {
      __typename: "ProductSpecification",
      id: string,
      group?:  {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupSpecificationsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProductSpecificationsQueryVariables = {
  filter?: ModelProductSpecificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProductSpecificationsQuery = {
  syncProductSpecifications?:  {
    __typename: "ModelProductSpecificationConnection",
    items:  Array< {
      __typename: "ProductSpecification",
      id: string,
      group?:  {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupSpecificationsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetImageQueryVariables = {
  id: string,
};

export type GetImageQuery = {
  getImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListImagesQueryVariables = {
  filter?: ModelImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListImagesQuery = {
  listImages?:  {
    __typename: "ModelImageConnection",
    items:  Array< {
      __typename: "Image",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productImagesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncImagesQueryVariables = {
  filter?: ModelImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncImagesQuery = {
  syncImages?:  {
    __typename: "ModelImageConnection",
    items:  Array< {
      __typename: "Image",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      url: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productImagesId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo?: string | null,
};

export type PublishProductQueryVariables = {
  productId?: string | null,
};

export type PublishProductQuery = {
  publishProduct?: string | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    price?: number | null,
    cost?: number | null,
    specGroups?:  {
      __typename: "ModelProductSpecGroupConnection",
      items:  Array< {
        __typename: "ProductSpecGroup",
        id: string,
        name: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    images?:  {
      __typename: "ModelImageConnection",
      items:  Array< {
        __typename: "Image",
        id: string,
        url: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productImagesId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    provider?: string | null,
    offShelfTime?: string | null,
    status: ProductStatus,
    createdAt?: string | null,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateProductSpecGroupSubscriptionVariables = {
  filter?: ModelSubscriptionProductSpecGroupFilterInput | null,
  owner?: string | null,
};

export type OnCreateProductSpecGroupSubscription = {
  onCreateProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateProductSpecGroupSubscriptionVariables = {
  filter?: ModelSubscriptionProductSpecGroupFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProductSpecGroupSubscription = {
  onUpdateProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteProductSpecGroupSubscriptionVariables = {
  filter?: ModelSubscriptionProductSpecGroupFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProductSpecGroupSubscription = {
  onDeleteProductSpecGroup?:  {
    __typename: "ProductSpecGroup",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    name: string,
    specifications?:  {
      __typename: "ModelProductSpecificationConnection",
      items:  Array< {
        __typename: "ProductSpecification",
        id: string,
        name: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        productSpecGroupSpecificationsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateProductSpecificationSubscriptionVariables = {
  filter?: ModelSubscriptionProductSpecificationFilterInput | null,
  owner?: string | null,
};

export type OnCreateProductSpecificationSubscription = {
  onCreateProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateProductSpecificationSubscriptionVariables = {
  filter?: ModelSubscriptionProductSpecificationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProductSpecificationSubscription = {
  onUpdateProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteProductSpecificationSubscriptionVariables = {
  filter?: ModelSubscriptionProductSpecificationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProductSpecificationSubscription = {
  onDeleteProductSpecification?:  {
    __typename: "ProductSpecification",
    id: string,
    group?:  {
      __typename: "ProductSpecGroup",
      id: string,
      product?:  {
        __typename: "Product",
        id: string,
        name: string,
        description?: string | null,
        price?: number | null,
        cost?: number | null,
        provider?: string | null,
        offShelfTime?: string | null,
        status: ProductStatus,
        createdAt?: string | null,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null,
      name: string,
      specifications?:  {
        __typename: "ModelProductSpecificationConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      productSpecGroupsId?: string | null,
      owner?: string | null,
    } | null,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productSpecGroupSpecificationsId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnCreateImageSubscription = {
  onCreateImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateImageSubscription = {
  onUpdateImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteImageSubscriptionVariables = {
  filter?: ModelSubscriptionImageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteImageSubscription = {
  onDeleteImage?:  {
    __typename: "Image",
    id: string,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      price?: number | null,
      cost?: number | null,
      specGroups?:  {
        __typename: "ModelProductSpecGroupConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      images?:  {
        __typename: "ModelImageConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      provider?: string | null,
      offShelfTime?: string | null,
      status: ProductStatus,
      createdAt?: string | null,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    url: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    productImagesId?: string | null,
    owner?: string | null,
  } | null,
};
