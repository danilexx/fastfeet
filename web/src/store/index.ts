import { createStore } from "easy-peasy";
import { StoreModel } from "./types";
import { user } from "./models";

export const storeStructure: StoreModel = {
  user,
};
const store = createStore(storeStructure);
export default store;
