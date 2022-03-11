import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../../../lib/useForm';
import DisplayError from '../../ErrorMessage';

import { Form } from './UpdateProduct.styles';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      where: { id: $id }
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

const UpdateProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  const { inputs, handleChange, resetForm } = useForm(
    data?.product || {
      name: '',
      description: '',
      price: '',
    }
  );

  const [
    updateProduct,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await updateProduct().catch(console.error);
      }}
    >
      <DisplayError error={error || errorUpdate} />
      <fieldset disabled={loadingUpdate} aria-busy={loadingUpdate}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add product</button>
      </fieldset>
    </Form>
  );
};

export default UpdateProduct;
