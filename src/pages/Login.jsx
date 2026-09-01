import { Eye } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    const result = login(email, password);

    alert(result.message);

    if (result.success) {
      setForm({
        email: "",
        password: "",
      });
      navigate("/");
    }
  };
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="max-w-7xl min-h-screen mx-auto flex">
        <div className="w-1/2 min-h-screen bg-blue-500 flex flex-col justify-center gap-6 p-12">
          <div className="text-white text-6xl font-bold leading-tight">
            <h1>Welcome</h1>
            <h1>To</h1>
            <h1>Todo Manager</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-md">
            Your all-in-one platform to manage your daily tasks, stay organized,
            and get things done.
          </p>
        </div>

        <div className="w-1/2 min-h-screen flex flex-col items-center justify-center bg-white px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Login Account
              </h2>

              <p className="text-gray-500 mt-2">Tasks are awaiting you</p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Eye
                    size={20}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-medium cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
