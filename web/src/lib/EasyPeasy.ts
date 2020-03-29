import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "../store/types";

const typedHooks = createTypedHooks<StoreModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
