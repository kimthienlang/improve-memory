import { useState } from "react";
import { type LoginFormValues } from "../types";
import { loginWithUsernamePassword } from "../services";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const login = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const result = await loginWithUsernamePassword(data);
      setUser(result.user);
      toast.success("Đăng nhập thành công!", { position: "top-right" });
      navigate("/");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi đăng nhập";
      toast.error(msg, { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
