import { useRouter } from 'next/router';

import { ProductsList } from '../../components/Product';
import { Pagination } from '../../components/UI';

export default function ProductsPage() {
  const router = useRouter();

  const { query } = router;

  const page = parseInt(query.page);

  return (
    <div>
      <Pagination page={page || 1} />
      <ProductsList page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
