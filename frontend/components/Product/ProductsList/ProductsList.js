import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import ProductCard from '../ProductCard';
import { ProductList } from './ProductsList.styles';

import { perPage } from '../../../config';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $take: Int) {
    products(take: $take, skip: $skip) {
      id
      name
      description
      price
      photo {
        id
        altText
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage,
    },
  });

  if (error) {
    <p>{error?.message}</p>;
  }

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <ProductList>
      {data?.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ProductList>
  );
};

export default ProductsList;
