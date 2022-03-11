import Router from 'next/router';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import useForm from '../../../lib/useForm';
import DisplayError from '../../ErrorMessage';

import { Form } from './CreateProduct.styles';
import { ALL_PRODUCTS_QUERY } from '../ProductsList/ProductsList';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in? And What types are they
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: '',
    description: '',
    price: 0,
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  console.log(loading);
  return (
    <Form
      onSubmit={async (event) => {
        event.preventDefault();

        const response = await createProduct();

        clearForm();

        Router.push({
          pathname: `product/${response.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
          />
        </label>
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
export default CreateProduct;
