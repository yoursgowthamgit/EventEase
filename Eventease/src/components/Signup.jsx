import React from "react";

export const SignupPage = ({ onNavigate }) => {
  const handleSignup = (e) => {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    if (name && email && password) {
      localStorage.setItem("isLoggedIn", "true");
      onNavigate("dashboard");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-6">Signup</h1>
      <form
        className="w-80 bg-white p-6 rounded-lg shadow-lg space-y-4"
        onSubmit={handleSignup}
      >
        <input name="name" type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          Signup
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <button className="text-primary" onClick={() => onNavigate("login")}>
          Login
        </button>
      </p>
    </div>
  );
};
