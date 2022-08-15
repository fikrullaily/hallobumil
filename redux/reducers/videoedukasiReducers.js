import {
  DELETE_VIDEOEDUKASI,
  EDIT_VIDEOEDUKASI,
  ERROR_VIDEOEDUKASI,
  GET_VIDEOEDUKASI,
} from "./types";

const initialState = {
  videos: [],
  video: {},
  loading: true,
};

export default function videoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOEDUKASI:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };

    case EDIT_VIDEOEDUKASI:
      return {
        ...state,
        videos: state.videos.map((video) =>
          video.id === action.payload.id ? (video = action.payload) : video
        ),
        loading: false,
      };

    case DELETE_VIDEOEDUKASI:
      const filteredState = state.videos.filter(
        (video) => video.id !== action.payload.id
      );
      return { ...state, videos: filteredState };

    case ERROR_VIDEOEDUKASI:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
