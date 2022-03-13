import { RequestReset, Reset } from '../../components/Auth';

export default function ResetPage({ query }) {
  const { token } = query;

  if (!token) {
    return (
      <>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </>
    );
  }

  return (
    <>
      <p>RESET YOUR PASSWORD</p>
      <Reset token={query.token} />
    </>
  );
}
