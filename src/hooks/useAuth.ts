import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { AuthContext } from "../context/AuthContext";
import { loginUser, registerUser } from "../api/authApi";
import type { LoginCredentials, SignupPayload } from "../types/Auth";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data, variables) => {
      login(variables.username, data.token);
      message.success("Logged in successfully");
    },
    onError: () => {
      message.error("Invalid username or password");
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) => registerUser(payload),
    onSuccess: () => {
      message.success("Account created, please log in");
    },
    onError: () => {
      message.error("Signup failed, please try again");
    },
  });
}
// useMutation that calls loginUser, then on success calls authContext.login() and shows an antd success message.