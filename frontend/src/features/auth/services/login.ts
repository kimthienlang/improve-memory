import api from "@/lib/api";
import type { LoginFormValues } from "../types";

export const loginWithUsernamePassword = async (data: LoginFormValues) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
