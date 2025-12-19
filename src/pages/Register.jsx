import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>
      <p>Register Form Will Go Here</p>
      <Link to="/characters">Sign Up</Link>
      <Link to="/">Back</Link>
    </div>
  );
};
