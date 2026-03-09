import api from "@/lib/api";
import type { SignupFormValues } from "../types";

export const signupWithUsernameAndEmail = async (data: SignupFormValues) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};
