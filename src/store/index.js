import { createStore } from "redux";
import customersReducer from "../reducers";

export default function configureStore() {
  return createStore(customersReducer);
}
