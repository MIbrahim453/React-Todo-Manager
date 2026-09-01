import { useState } from "react";
import { useAuth } from "../context/authContext";

function Profile() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = updateProfile(form);

    alert(result.message);
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-green-500 rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">My Profile</h2>
          <p className="text-green-100 mt-2">
            Update your profile information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-white">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-white rounded-lg px-4 py-3
                         text-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-white">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-white rounded-lg px-4 py-3
                         text-black outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="text"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-white rounded-lg px-4 py-3
                         text-black outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-green-700 py-3
                       rounded-lg font-semibold
                       hover:bg-green-100 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
