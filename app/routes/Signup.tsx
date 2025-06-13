import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/customer/register",
        {
            username: email,
            password,
            name: username,
            address,
            phoneNumber: phone,
        }
      );

      setSuccess("Account created successfully! You can now log in.");
      setError("");
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data || "Registration failed.");
      setSuccess("");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#fdf6e3]">
      {/* Left - Illustration */}
      <div className="flex w-1/2 items-center justify-center bg-[#69b9e7] rounded-r-3xl">
        <div className="relative mx-auto">
          <img
            src="/images/products/register.jpg"
            alt="rumah eskimo"
            className="object-contain h-[500px] w-[625px]"
          />
        </div>
      </div>

      {/* Right - Signup Form */}
      <div className="flex w-1/2 items-center justify-center bg-[#f5f5f5]">
        <div className="w-[400px] max-w-[80%]">
          <h1 className="mb-10 text-3xl font-bold text-[#111]">
            CREATE ACCOUNT
          </h1>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
          {success && (
            <div className="mb-4 text-sm text-green-600">{success}</div>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="mb-1 block text-xs uppercase tracking-wide text-[#666]"
            >
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

          <div className="mb-6">
            <label
              htmlFor="username"
              className="mb-1 block text-xs uppercase tracking-wide text-[#666]"
            >
              Name
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

          <div className="mb-6">
            <label
              htmlFor="address"
              className="mb-1 block text-xs uppercase tracking-wide text-[#666]"
            >
              Address
            </label>
            <input
              id="address"
              type="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-[#ccc] bg-transparent px-4 py-3 focus:border-[#0099ff] focus:outline-none text-black"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="mb-1 block text-xs uppercase tracking-wide text-[#666]"
            >
              Phone number
            </label>
            <input
              id="phone"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-md border border-[#ccc] bg-transparent px-4 py-3 focus:border-[#0099ff] focus:outline-none text-black"
            />
          </div>

          <button
            onClick={handleSignup}
            className="mb-4 w-full rounded-lg bg-[#0099ff] py-3 text-center font-medium text-white transition-colors hover:bg-[#0088ee]"
          >
            CREATE ACCOUNT
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Already Have An Account?{" "}
              <a
                href="/"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
