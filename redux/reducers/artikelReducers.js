import {
  GET_ARTIKELMINGGUAN,
  DELETE_ARTIKELMINGGUAN,
  EDIT_ARTIKELMINGGUAN,
  ERROR_ARTIKELMINGGUAN,
} from "./types";

const initialState = {
  artikels: [],
  artikel: {},
  loading: true,
};

export default function artikelReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTIKELMINGGUAN:
      return {
        ...state,
        artikels: action.payload,
        loading: false,
      };
    case EDIT_ARTIKELMINGGUAN:
      return {
        ...state,
        artikels: state.artikels.map((artikel) =>
          artikel.id === action.payload.id
            ? (artikel = action.payload)
            : artikel
        ),
        loading: false,
      };
    case DELETE_ARTIKELMINGGUAN:
      const filteredState = state.artikels.filter(
        (artikel) => artikel.id !== action.payload.id
      );
      return {
        ...state,
        artikels: filteredState,
      };
    case ERROR_ARTIKELMINGGUAN:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
