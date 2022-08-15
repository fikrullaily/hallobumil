import { LOGIN, LOGOUT, ERROR, GET_LOGIN } from "./types";

const initialState = {
  users: null,
  loading: true,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        users: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        users: null,
      };

    case ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
