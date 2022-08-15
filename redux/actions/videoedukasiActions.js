import axios from "axios";
import {
  DELETE_VIDEOEDUKASI,
  EDIT_VIDEOEDUKASI,
  ERROR_VIDEOEDUKASI,
  GET_VIDEOEDUKASI,
} from "../reducers/types";

export const getVideo = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/videoedukasi`);
    dispatch({
      type: GET_VIDEOEDUKASI,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: ERROR_VIDEOEDUKASI,
      payload: error,
    });
  }
};

export const editVideo = (video) => async (dispatch) => {
  try {
    await axios.put(`/api/videoedukasi/${video.id}`, video).then((response) => {
      dispatch({
        type: EDIT_VIDEOEDUKASI,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: ERROR_VIDEOEDUKASI,
      payload: error,
    });
  }
};

export const deleteVideo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/videoedukasi/${id}`).then((response) => {
      dispatch({
        type: DELETE_VIDEOEDUKASI,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: ERROR_VIDEOEDUKASI,
      payload: error,
    });
  }
};
