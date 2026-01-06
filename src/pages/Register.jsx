import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import castleBackground from "../assets/images/castle-bg-grad.webp";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!username || !password || !confirmPassword) {
      setError("All fields required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await register(username, password);
      navigate("/landing");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center bg-cover bg-center bg-no-repeat pt-65 pb-8"
      style={{ backgroundImage: `url(${castleBackground})` }}
    >
  <div className="relative w-full max-w-md mx-4">
    {/* Title - Absolutely positioned */}
    <div className="mb-8">
      <h1 className="font-washington text-9xl font-bold text-center text-stone-300 mb-2 tracking-wide">
        Gloam
      </h1>
      <p className="font-washington text-4xl text-center text-stone-300 mb-8 tracking-wider">
        The Winding Path
      </p>
    </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="font-washington block text-stone-300 mb-2 text-xl font-medium tracking-wide"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-stone-900/80 border-2 border-stone-700 rounded text-stone-100 
                      focus:outline-none focus:border-stone-400
                      disabled:opacity-50 disabled:cursor-not-allowed
                      placeholder:text-stone-600"
              placeholder="Create username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-washington block text-stone-300 mb-2 text-xl font-medium tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-stone-900/80 border-2 border-stone-700 rounded text-stone-100
                      focus:outline-none focus:border-stone-400
                      disabled:opacity-50 disabled:cursor-not-allowed
                      placeholder:text-stone-600"
              placeholder="Create password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="font-washington block text-stone-300 mb-2 text-xl font-medium tracking-wide"
              >
                Confirm Password
              </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-stone-900/80 border-2 border-stone-700 rounded text-stone-100
                      focus:outline-none focus:border-stone-400
                      disabled:opacity-50 disabled:cursor-not-allowed
                      placeholder:text-stone-600"
              placeholder="Confirm password"
            />
          </div>

          {error && (
            <div className="bg-red-900/50 text-red-100 px-4 py-3 border-2 border-red-900 rounded text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-washington text-3xl w-full bg-stone-700 hover:bg-red-800 active:bg-red-900 
                      text-stone-100 py-3 px-4 rounded
                      transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-700
                      shadow-lg hover:shadow-red-900/50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-stone-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-red-900 hover:text-red-700 font-medium no-underline transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
