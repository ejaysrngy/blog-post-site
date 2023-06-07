import { Reducer } from "react";
import { ReducerActionTypes, ReducerStateTypes } from "./types";

const initialState = {
  email: "",
  name: "",
  message: "",
};

const reducer: Reducer<ReducerStateTypes, ReducerActionTypes> = (
  state: ReducerStateTypes,
  action: ReducerActionTypes
) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_EMAIL":
      return {
        ...state,
        email: payload.email,
      };
    case "UPDATE_NAME":
    return {
        ...state,
        name: payload.name,
    };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        message: payload.message,
      };
    default:
      return state;
  }
};

export { reducer, initialState };
