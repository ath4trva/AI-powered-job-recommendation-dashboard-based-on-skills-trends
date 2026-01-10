import React, { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple Validation
    if (!email || !password || (isSignUp && !name)) {
      alert("Please fill in all fields");
      return;
    }

    // Dummy Authentication Logic
    console.log("User Authenticated:", {
      email,
      name: isSignUp ? name : "User",
    });

    // Save state to local storage to persist login
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);

    // Trigger the parent function to update the app state
    onLogin();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="bg-white rounded-xl p-6 sm:p-10 w-full max-w-sm sm:max-w-md shadow-lg border border-slate-200">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
            {isSignUp ? "Join Us" : "Welcome Back"}
          </h2>
          <p className="text-text-secondary text-sm">
            {isSignUp
              ? "Create your professional profile"
              : "Login to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-text-primary text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white border border-border text-text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
          )}

          <div>
            <label className="block text-text-primary text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white border border-border text-text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-text-primary text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-white border border-border text-text-primary placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-full hover:bg-primary-dark transition duration-200 mt-6"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-text-secondary text-sm mt-6">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary cursor-pointer hover:underline font-semibold transition"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
