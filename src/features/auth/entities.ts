export interface UserCreatePayload {
  email: string;
  password: string;
  username: string;
}

export interface LoginPayload {
  password: string;
  username: string;
}
