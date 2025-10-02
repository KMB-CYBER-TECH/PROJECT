import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Retrieve existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      // If email exists → check password
      if (users[email] === password) {
        // ✅ Save logged-in user to localStorage
        localStorage.setItem("username", email.split("@")[0]);
        localStorage.setItem("isLoggedIn", "true"); // added
        navigate("/home");
      } else {
        alert("❌ Wrong password. Please try again.");
      }
    } else {
      // If email not found → treat as new registration
      users[email] = password;
      localStorage.setItem("users", JSON.stringify(users));

      // ✅ Save new logged-in user
      localStorage.setItem("username", email.split("@")[0]);
      localStorage.setItem("isLoggedIn", "true"); // added

      alert("✅ Account created and logged in!");
      navigate("/home");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Your existing background/decoration elements stay the same */}

      <div className="relative z-10 w-full max-w-md">
        {/* Glass morphism card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/20">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">ED-Game</h1>
            <p className="text-white/70 text-sm">
              Welcome back! Ready to learn and play?
            </p>
          </div>

          {/* 🚀 Your Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-white/90 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50"
                >
                  
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
             {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              New to EduGame?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-300 hover:text-purple-200 font-medium hover:underline transition-colors"
                type="button"
              >
                Create an account
              </button>
            </p>
          </div>
          </form>
        </div>
      </div>
      
    </div>
    
  );
}
