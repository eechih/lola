// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ProductStatus = {
  "ACTIVE": "ACTIVE",
  "INACTIVE": "INACTIVE"
};

const { Product } = initSchema(schema);

export {
  Product,
  ProductStatus
};