export interface IUser {
  username: string,
};

export interface IAuth {
  isAuthenticated: false,
  isLoading: false,
  user: IUser | null,
  error: string
};
