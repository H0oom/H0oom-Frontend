export interface SignupRequest {
  email: string;
  password: string;
  fullname: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  fullname: string;
  email: string;
  token: string;
}
