import { UpdateProduct } from '../../components/Product';
import PleaseSignIn from '../../components/Auth/PleaseSignIn';

export default function UpdateProductPage({ query }) {
  return (
    <PleaseSignIn>
      <UpdateProduct id={query.id} />;
    </PleaseSignIn>
  );
}
