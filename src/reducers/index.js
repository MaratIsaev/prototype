import {
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  CREATE_CUSTOMER
} from "../actions/constants";
import initialState from "./initialState";

const customersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CUSTOMER:
      const { customers } = state;
      const IDs = customers.map(el => el.id);
      const newID = Math.max(...IDs) + 1;
      return { ...state, customers: [{ ...payload, id: newID }, ...customers] };
    case UPDATE_CUSTOMER:
      const changedCustomers = state.customers.map(el => {
        if (el.id === payload.id) return payload;
        return el;
      });
      return { ...state, customers: changedCustomers };
    case DELETE_CUSTOMER:
      const restCustomers = state.customers.filter(el => el.id !== payload);
      return { ...state, customers: restCustomers };
    default:
      return state;
  }
};

export default customersReducer;
