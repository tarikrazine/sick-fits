import Head from 'next/head';
import Link from 'next/link';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import DisplayError from '../../ErrorMessage';

import { PaginationStyles } from './Pagination.styles';

import { perPage } from '../../../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    productsCount
  }
`;

const Pagination = ({ page }) => {
  const { data, error, loading } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <DisplayError error={error} />;

  const count = data?.productsCount;

  const pageCount = Math.ceil(count / perPage);

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
