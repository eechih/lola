import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}



type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly cost?: number | null;
  readonly specGroups?: (ProductSpecGroup | null)[] | null;
  readonly images?: (Image | null)[] | null;
  readonly provider?: string | null;
  readonly offShelfTime?: string | null;
  readonly status: ProductStatus | keyof typeof ProductStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly cost?: number | null;
  readonly specGroups: AsyncCollection<ProductSpecGroup>;
  readonly images: AsyncCollection<Image>;
  readonly provider?: string | null;
  readonly offShelfTime?: string | null;
  readonly status: ProductStatus | keyof typeof ProductStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerProductSpecGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductSpecGroup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly product?: Product | null;
  readonly name: string;
  readonly specifications?: (ProductSpecification | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productSpecGroupsId?: string | null;
}

type LazyProductSpecGroup = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductSpecGroup, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly name: string;
  readonly specifications: AsyncCollection<ProductSpecification>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productSpecGroupsId?: string | null;
}

export declare type ProductSpecGroup = LazyLoading extends LazyLoadingDisabled ? EagerProductSpecGroup : LazyProductSpecGroup

export declare const ProductSpecGroup: (new (init: ModelInit<ProductSpecGroup>) => ProductSpecGroup) & {
  copyOf(source: ProductSpecGroup, mutator: (draft: MutableModel<ProductSpecGroup>) => MutableModel<ProductSpecGroup> | void): ProductSpecGroup;
}

type EagerProductSpecification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductSpecification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group?: ProductSpecGroup | null;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productSpecGroupSpecificationsId?: string | null;
}

type LazyProductSpecification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductSpecification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly group: AsyncItem<ProductSpecGroup | undefined>;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productSpecGroupSpecificationsId?: string | null;
}

export declare type ProductSpecification = LazyLoading extends LazyLoadingDisabled ? EagerProductSpecification : LazyProductSpecification

export declare const ProductSpecification: (new (init: ModelInit<ProductSpecification>) => ProductSpecification) & {
  copyOf(source: ProductSpecification, mutator: (draft: MutableModel<ProductSpecification>) => MutableModel<ProductSpecification> | void): ProductSpecification;
}

type EagerImage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Image, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly product?: Product | null;
  readonly url: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productImagesId?: string | null;
}

type LazyImage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Image, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly url: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productImagesId?: string | null;
}

export declare type Image = LazyLoading extends LazyLoadingDisabled ? EagerImage : LazyImage

export declare const Image: (new (init: ModelInit<Image>) => Image) & {
  copyOf(source: Image, mutator: (draft: MutableModel<Image>) => MutableModel<Image> | void): Image;
}