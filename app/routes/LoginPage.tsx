import type { Route } from "./+types/LoginPage";
import { Welcome } from "../welcome/welcome";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { accessToken, tokenType, username, authorities } = response.data;

      // Save token in localStorage or context
      localStorage.setItem("token", `${tokenType} ${accessToken}`);
      localStorage.setItem("username", username);

      // Navigate or update state (you may use react-router-dom)
      window.location.href = "/homepage";

    } catch (err) {
      setError("Invalid email or password");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#fdf6e3]">
      <div className="flex w-1/2 items-center justify-center bg-[#fdf6e3]">
        <div className="w-[400px] max-w-[80%]">
          <h1 className="mb-10 text-3xl font-bold text-[#111]">Let&apos;s Get Started</h1>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <div className="mb-6">
            <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wide text-[#666]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#ccc] bg-transparent px-4 py-3 focus:border-[#0099ff] focus:outline-none text-black"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="mb-1 block text-xs uppercase tracking-wide text-[#666]">
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
              Already have an account? {" "}
              <a href="signup" className="text-blue-500 hover:text-blue-600 font-medium">
                Register 
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center bg-[#69b9e7] rounded-l-3xl">
        <div className="relative mx-auto">
          <img src="/club-character.png" alt="Club character" className="object-contain h-[500px] w-[625px]" />
        </div>
      </div>
    </div>
  );
}
