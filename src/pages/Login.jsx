import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <p>Login Form Will Go Here</p>
      <Link to="/characters">Sign In</Link>
      <Link to="/register">Sign Up</Link>
    </div>
  );
};
