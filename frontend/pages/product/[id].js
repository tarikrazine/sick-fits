import { ProductDetails } from '../../components/Product';

export default function SingleProductPage({ query }) {
  return <ProductDetails id={query} />;
}
