import { useEffect } from "react";

/**
 * Authorization page.
 *
 * @returns JSX.Element
 */
const Auth = (): JSX.Element => {
  // Redirect to authorization.
  useEffect(() => {
    window.location.href = "http://127.0.0.1:8000/auth";
  }, []);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default Auth;
