import Image from 'next/image';
import Link from 'next/link';

import formatMoney from '../../../lib/formatMoney';
import { AddToCart } from '../../UI/CartUI';
import DeleteProduct from '../DeleteProduct';

import { ItemStyles, Title, PriceTag } from './ProductCard.styles';

const ProductCard = ({ id, name, photo, price, description }) => (
  <ItemStyles>
    <Image
      src={photo?.image?.publicUrlTransformed}
      alt={photo?.altText}
      height={400}
      width="100%"
      quality={100}
      objectFit="cover"
      blurDataURL={`"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8Nk2xHgAF5QIOVGNDdwAAAABJRU5ErkJggg=="`}
      placeholder="blur"
    />
    <Title>
      <Link href={`/product/${id}`}>{name}</Link>
    </Title>
    <PriceTag>{formatMoney(price)}</PriceTag>
    <p>{description}</p>
    <div className="buttonList">
      <Link href={{ pathname: '/update', query: { id } }}>Edit ✏️</Link>
      <AddToCart id={id} />
      <DeleteProduct id={id}>Delete</DeleteProduct>
    </div>
  </ItemStyles>
);
export default ProductCard;
