import { useState } from "react";

function usePassword() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return { showPassword, togglePassword };
}

export default usePassword;
