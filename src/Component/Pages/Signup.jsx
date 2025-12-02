import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Lock, Shield, ArrowRight, Loader2 } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const urlRole = new URLSearchParams(location.search).get("role") || "STUDENT";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: urlRole.toUpperCase()
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", form.username);

      if (form.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.error(error);
      setErrors({ 
        submit: error.response?.data?.message || "Signup failed. Please try again." 
      });
    }

    setLoading(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "ADMIN":
        return <Shield className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "from-red-500 to-pink-500";
      default:
        return "from-purple-500 to-cyan-500";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 relative overflow-hidden">
  
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl z-10 transform transition-all duration-300 hover:shadow-3xl">
      
        <div className="text-center mb-8">
          <div className={`w-16 h-16 bg-gradient-to-r ${getRoleColor(form.role)} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            {getRoleIcon(form.role)}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Join ED-Games
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/70">
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getRoleColor(form.role)} text-white text-sm font-medium flex items-center gap-1`}>
              {getRoleIcon(form.role)}
              {form.role} Account
            </div>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
         
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Username
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="username"
                required
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username..."
                className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                  errors.username ? "border-red-400" : "border-white/20"
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
              />
            </div>
            {errors.username && (
              <p className="text-red-300 text-sm flex items-center gap-1">
                <span>•</span>
                {errors.username}
              </p>
            )}
          </div>

      
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address..."
                className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                  errors.email ? "border-red-400" : "border-white/20"
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
              />
            </div>
            {errors.email && (
              <p className="text-red-300 text-sm flex items-center gap-1">
                <span>•</span>
                {errors.email}
              </p>
            )}
          </div>

      
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password..."
                className={`w-full pl-12 pr-12 py-3 bg-white/5 border ${
                  errors.password ? "border-red-400" : "border-white/20"
                } rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm flex items-center gap-1">
                <span>•</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "STUDENT", label: "Student", color: "from-purple-500 to-cyan-500", icon: User },
                { value: "ADMIN", label: "Admin", color: "from-red-500 to-pink-500", icon: Shield }
              ].map((roleOption) => (
                <button
                  key={roleOption.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: roleOption.value })}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    form.role === roleOption.value
                      ? `bg-gradient-to-r ${roleOption.color} border-transparent text-white shadow-lg`
                      : "bg-white/5 border-white/10 text-white/70 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <roleOption.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{roleOption.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-cyan-600 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Error Message */}
          {errors.submit && (
            <div className="p-3 bg-red-400/20 border border-red-400/30 rounded-xl">
              <p className="text-red-200 text-sm text-center">{errors.submit}</p>
            </div>
          )}
        </form>

        {/* Login Link */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-center text-white/70 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate(`/login?role=${form.role.toLowerCase()}`)}
              className="text-cyan-300 font-semibold hover:text-cyan-200 hover:underline transition-colors"
            >
              Sign in instead
            </button>
          </p>
        </div>

        {/* Features List */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400 text-xs">✓</span>
            </div>
            <span>Unlock all quizzes and games</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400 text-xs">✓</span>
            </div>
            <span>Track your progress and earn XP</span>
          </div>
          <div className="flex items-center gap-3 text-white/60 text-sm">
            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400 text-xs">✓</span>
            </div>
            <span>Compete on leaderboards</span>
          </div>
        </div>
      </div>
    </div>
  );
}