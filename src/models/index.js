// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ProductStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { Product, ProductSpecGroup, ProductSpecification, Image } = initSchema(schema);

export {
  Product,
  ProductSpecGroup,
  ProductSpecification,
  Image,
  ProductStatus
};