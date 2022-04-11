import PleaseSignIn from '../../components/Auth/PleaseSignIn';
import { CreateProduct } from '../../components/Product';

export default function SellPage() {
  return (
    <PleaseSignIn>
      <CreateProduct />;
    </PleaseSignIn>
  );
}
