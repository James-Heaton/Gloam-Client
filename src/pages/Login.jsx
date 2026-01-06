import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import castleBackground from "../assets/images/castle-bg-grad.webp";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password required");
      return;
    }

    setLoading(true);

    try {
      await login(username, password);
      
      // Start exit animation
      setIsAnimatingOut(true);
      
      // Wait for animation to complete before navigating
      setTimeout(() => {
        navigate("/landing");
      }, 2000); // 2 seconds for animation (adjust as needed)
      
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-start justify-center bg-black bg-cover bg-center bg-no-repeat pt-65 pb-8 transition-all ${isAnimatingOut ? 'background-pan-up' : ''}`}
      style={{ backgroundImage: `url(${castleBackground})` }}
    >
      {/* Login form container */}
  <div className={`relative w-full max-w-md mx-4 transition-opacity ${isAnimatingOut ? 'fade-out' : ''}`}>
    {/* Title - Absolutely positioned */}
    <div className="mb-8">
      <h1 className="font-washington text-9xl font-bold text-center text-stone-300 mb-2 tracking-wide">
        Gloam
      </h1>
      <p className="font-washington text-4xl text-center text-stone-300 mb-8 tracking-wider">
        The Winding Path
      </p>
    </div>

          {/* <h2 className="text-2xl text-stone-300 mb-6 text-center font-semibold">
            Sign In
          </h2> */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username field */}
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
                placeholder="Enter your username"
              />
            </div>

            {/* Password field */}
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
                placeholder="Enter your password"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-900/50 text-red-100 px-4 py-3 border-2 border-red-900 rounded text-center">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="font-washington text-3xl w-full bg-stone-700 hover:bg-red-800 active:bg-red-900 
                        text-stone-100 py-3 px-4 rounded
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-700
                        shadow-lg hover:shadow-red-900/50"
            >
              {loading ? "Entering..." : "Enter"}
            </button>

            {/* Sign up link */}
            <p className="text-center text-stone-400 mt-6 text-sm">
              First adventure?{" "}
              <Link
                to="/register"
                className="text-red-900 hover:text-red-700 font-medium no-underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
      </div>
    </div>
  );
};
