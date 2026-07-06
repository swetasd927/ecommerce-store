import { api } from "./axios";
import type { LoginRequest, LoginResponse } from "../types/Auth";

export async function loginUser(
  credentials: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post("auth/login", credentials);
  return response.data;
}