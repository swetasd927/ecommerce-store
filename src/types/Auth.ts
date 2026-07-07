export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export interface SignupResponse {
  id: number;
}

export interface AuthUser {
  username: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => void;
  logout: () => void;
}