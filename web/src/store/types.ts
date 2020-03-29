import { Action } from "easy-peasy";

// The interface representing our Todos model
export interface UserModel {
  isLogged: boolean;
  token: string | null;
  login: Action<UserModel, { token: string }>;
  logout: Action<UserModel>;
}

// The interface representing our entire store model
export interface StoreModel {
  user: UserModel;
}
