import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../../../lib/useForm';
import DisplayError from '../../ErrorMessage';

import { Form } from './SignUp.styles';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const [signUp, { data, error, loading }] = useMutation(CREATE_USER_MUTATION, {
    variables: inputs,
  });

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const response = await signUp().catch(console.error);

    clearForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmitForm}>
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.createUser && (
          <p>
            Signed up with {data.createUser.email} - Please Go Head and Sign in!
          </p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*******"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
