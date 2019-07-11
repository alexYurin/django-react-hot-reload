export interface IUser {
  username: string,
  email: string,
  token: string,
};

export interface IAuth {
  isAuthenticated: false,
  isLoading: false,
  user: IUser | null,
  error: string
};
