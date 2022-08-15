import { DELETE_ADMIN, GET_ADMIN, ADMIN_ERROR, EDIT_ADMIN } from "./types";

const initialState = {
  admins: [],
  admin: {},
  loading: true,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        admins: action.payload,
        loading: false,
      };

    case EDIT_ADMIN:
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin.id === action.payload.id ? (admin = action.payload) : admin
        ),
        loading: false,
      };

    case DELETE_ADMIN:
      const filteredState = state.admins.filter(
        (admin) => admin.id !== action.payload.id
      );
      return { ...state, admins: filteredState };

    case ADMIN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
