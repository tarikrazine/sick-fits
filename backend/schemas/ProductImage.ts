import 'dotenv/config';
import config from 'config';
import { list } from '@keystone-6/core';
import { text, relationship } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';

export const cloudinary = {
  cloudName: config.get<string>('cloudinaryCloudName'),
  apiKey: config.get<string>('cloudinaryKey'),
  apiSecret: config.get<string>('cloudinarySecret'),
  folder: 'sick-fits',
};

export const ProductImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary,
      label: 'Source',
    }),
    altText: text(),
    product: relationship({
      ref: 'Product.photo',
    }),
  },
  ui: {
    listView: {
      initialColumns: ['id', 'image', 'altText', 'product'],
    },
  },
});
