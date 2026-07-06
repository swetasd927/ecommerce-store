export interface LoginRequest {
    username: string,
    password: string,
}
export interface LoginResponse{
    token: string,
}

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// export interface LoginResponse {
//   token: string;
// }

// export interface AuthContextType {
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// }