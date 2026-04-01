import { useState } from "react";
import type { RegisterFormValues } from "../types";
import { registerWithUsernameAndEmail } from "../services";
import { toast } from "sonner";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const result = await registerWithUsernameAndEmail(data);
      localStorage.setItem("accessToken", result.token);
      toast.success("Đăng ký thành công!", { position: "top-right" });
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi đăng ký";
      toast.error(msg, { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, register };
};
