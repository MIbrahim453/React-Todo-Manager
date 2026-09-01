import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }

    setLoading(false);
  }, []);

  const signUp = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingEmail = users.find((user) => user.email === email);
    if (existingEmail) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };
    users.push(newUser);
    setUser(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return {
      success: true,
      message: "Account created successfully",
    };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loginUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!loginUser) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    localStorage.setItem("user", JSON.stringify(loginUser));
    setUser(loginUser);

    return {
      success: true,
      message: "Logged in successfully",
    };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    const updatedUsers = users.map((item) =>
      item.id === user.id ? updatedUser : item,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setUser(updatedUser);

    return {
      success: true,
      message: "Profile updated successfully",
    };
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, signUp, login, loading, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
