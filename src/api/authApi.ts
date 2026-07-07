import { api } from "./axios";
import type {
  LoginCredentials,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "../types/Auth";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (
  payload: SignupPayload,
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/users", payload);
  return response.data;
};