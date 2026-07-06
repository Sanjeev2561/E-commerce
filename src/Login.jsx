import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      tel: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleClick = () => {
    setIsRegister(!isRegister);
    clearForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const email = formData.email.trim().toLowerCase();

      const alreadyExists = users.some((user) => user.email === email);

      if (alreadyExists) {
        alert("This email is already registered. Please login.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        email: email,
        tel: formData.tel.trim(),
        password: formData.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Signup successful! Please login.");
      clearForm();
      setIsRegister(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const enteredEmail = formData.email.trim().toLowerCase();

    const savedUser = users.find(
      (user) =>
        user.email === enteredEmail &&
        user.password === formData.password
    );

    if (!savedUser) {
      alert("Incorrect email or password.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        tel: savedUser.tel,
      })
    );

    alert(`Welcome back, ${savedUser.name}! 🎉`);

    clearForm();
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900 px-4 py-10">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/25 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-3xl shadow-lg shadow-cyan-500/30">
            👋
          </div>

          <h1 className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 bg-clip-text text-3xl font-bold text-transparent">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="mt-2 text-sm text-gray-300">
            {isRegister
              ? "Create an account and start shopping."
              : "Login to continue shopping with us."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label className="mb-2 block font-medium text-gray-200">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block font-medium text-gray-200">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

          {isRegister && (
            <div>
              <label className="mb-2 block font-medium text-gray-200">
                Phone Number
              </label>

              <input
                type="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block font-medium text-gray-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

          {isRegister && (
            <div>
              <label className="mb-2 block font-medium text-gray-200">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 py-3 font-bold text-white shadow-lg shadow-cyan-500/25 transition duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-purple-500"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>

          <p className="pt-1 text-center text-sm text-gray-300">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={handleClick}
              className="ml-2 font-semibold text-cyan-300 transition hover:text-cyan-100 hover:underline"
            >
              {isRegister ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;