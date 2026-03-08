import { useState } from "react";
import { type LoginFormValues } from "../types";
import { loginWithUsernamePassword } from "../api";
import { toast } from "sonner";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await loginWithUsernamePassword(data);
      localStorage.setItem("accessToken", result.token);
      toast.success("Đăng nhập thành công!");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi đăng nhập";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
