import React from "react";

export const LoginPage = ({ onNavigate }) => {
  const handleLogin = (e) => {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (email && password) {
      // Save login state
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to Dashboard
      onNavigate("dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Login</h1>
      <form
        className="w-80 bg-white p-6 rounded-lg shadow-md space-y-4"
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          className="text-blue-600 hover:underline"
          onClick={() => onNavigate("signup")}
        >
          Signup
        </button>
      </p>
    </div>
  );
};
