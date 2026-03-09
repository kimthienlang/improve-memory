import { useState } from "react";
import type { SignupFormValues } from "../types";
import { signupWithUsernameAndEmail } from "../services";
import { toast } from "sonner";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const result = await signupWithUsernameAndEmail(data);
      localStorage.setItem("accessToken", result.token);
      toast.success("Đăng nhập thành công!", { position: "top-right" });
    } catch (error: any) {
      const msg = error.response?.data?.message || "Lỗi đăng nhập";
      toast.error(msg, { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signup };
};
