// import type { Route } from "./+types/LoginPage";
import { Welcome } from "../welcome/welcome";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ...existing code...
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password,
        }
      );
      const {
        accessToken,
        tokenType,
        username: usernameResponse,
        authorities,
      } = response.data;

      // Save token in localStorage or context
      localStorage.setItem("token", accessToken);
      localStorage.setItem("username", usernameResponse);
      const roles = authorities.map(
        (auth: { authority: string }) => auth.authority
      );
      if (roles.includes("ROLE_ADMIN")) {
        window.location.href = "/admin";
      } else if (roles.includes("ROLE_CUSTOMER")) {
        window.location.href = "/homepage";
      } else {
        setError("Unknown role. Cannot redirect.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
      if (err.response) {
        console.error("Login failed:", err.response.data);
      } else {
        console.error("Login failed:", err.message || err);
      }
    }
  };
  // ...existing code...

  return (
    <div className="flex h-screen w-full bg-[#fdf6e3]">
      <div className="flex w-1/2 items-center justify-center bg-[#fdf6e3]">
        <div className="w-[400px] max-w-[80%]">
          <h1 className="mb-10 text-3xl font-bold text-[#111]">
            Let&apos;s Get Started
          </h1>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <div className="mb-6">
            <label
              htmlFor="username"
              className="mb-1 block text-xs uppercase tracking-wide text-[#666]"
            >
              Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-[#ccc] bg-transparent px-4 py-3 focus:border-[#0099ff] focus:outline-none text-black"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="mb-1 block text-xs uppercase tracking-wide text-[#666]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[#ccc] bg-transparent px-4 py-3 focus:border-[#0099ff] focus:outline-none text-black"
            />
          </div>

          <button
            onClick={handleLogin}
            className="mb-4 w-full rounded-lg bg-[#0099ff] py-3 text-center font-medium text-white transition-colors hover:bg-[#0088ee]"
          >
            LOGIN
          </button>

          <div>
            <a href="#" className="text-sm text-[#666] hover:text-[#0099ff]">
              Forget Your Password?
            </a>
          </div>

          <div>
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="signup"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center bg-[#69b9e7] rounded-l-3xl">
        <div className="relative mx-auto">
          <img
            src="/images/products/login.jpg"
            alt="Club character"
            className="object-contain h-[500px] w-[625px]"
          />
        </div>
      </div>
    </div>
  );
}
