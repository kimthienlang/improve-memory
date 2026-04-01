import api from "@/lib/api";
import type { RegisterFormValues } from "../types";

export const registerWithUsernameAndEmail = async (data: RegisterFormValues) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
