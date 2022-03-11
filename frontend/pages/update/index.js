import { UpdateProduct } from '../../components/Product';

export default function UpdateProductPage({ query }) {
  return <UpdateProduct id={query.id} />;
}
