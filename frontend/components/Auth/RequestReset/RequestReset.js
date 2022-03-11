import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import useForm from '../../../lib/useForm';
import DisplayError from '../../ErrorMessage';

import { CURRENT_USER_QUERY } from '../../User';

import { Form } from './RequestReset.styles';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [requestReset, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  console.log({ data, error });

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    await requestReset();

    resetForm();
  };

  return (
    <Form method="POST" onSubmit={handleSubmitForm}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
