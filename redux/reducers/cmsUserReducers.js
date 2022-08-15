import {
  DELETE_CMSUSERS,
  GET_CMSUSERS,
  CMSUSERS_ERROR,
  EDIT_CMSUSERS,
} from "./types";

const initialState = {
  cmsUsers: [],
  cms_user: {},
  loading: true,
};

export default function cmsUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CMSUSERS:
      return {
        ...state,
        cmsUsers: action.payload,
        loading: false,
      };

    case EDIT_CMSUSERS:
      return {
        ...state,
        cmsUsers: state.cmsUsers.map((cms_user) =>
          cms_user.id === action.payload.id
            ? (cms_user = action.payload)
            : cms_user
        ),
        loading: false,
      };

    case DELETE_CMSUSERS:
      const filteredState = state.cmsUsers.filter(
        (cms_user) => cms_user.id !== action.payload.id
      );
      return { ...state, cmsUsers: filteredState };

    case CMSUSERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
