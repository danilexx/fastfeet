import { action } from "easy-peasy";
import cookie from "react-cookies";
import { UserModel } from "../types";

const user: UserModel = {
  isLogged: false,
  token: null,
  login: action((state, payload) => {
    state.isLogged = true;
    state.token = payload.token;
    cookie.save("token", payload.token, { path: "/" });
  }),
  logout: action(state => {
    state.token = null;
    state.isLogged = false;
    cookie.remove("token");
  }),
};

export default user;
