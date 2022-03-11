import Image from 'next/image';
import Head from 'next/head';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import DisplayError from '../../ErrorMessage';

import { ProductDetailsStyles } from './ProductDetails.styles';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        altText
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductDetails = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: id,
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  return (
    <ProductDetailsStyles>
      <Head>
        <title>{data.product.name} | Sick Fits</title>
      </Head>
      <Image
        src={data?.product.photo?.image?.publicUrlTransformed}
        alt={data?.product.photo?.altText}
        height="100%"
        width="100%"
        layout="responsive"
        objectFit="cover"
        quality={100}
        blurDataURL={`"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8Nk2xHgAF5QIOVGNDdwAAAABJRU5ErkJggg=="`}
        placeholder="blur"
      />
      <div className="prodcut-details">
        <h2>{data?.product.name}</h2>
        <p>{data?.product.description}</p>
      </div>
    </ProductDetailsStyles>
  );
};

export default ProductDetails;
