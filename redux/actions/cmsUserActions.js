import {
  DELETE_CMSUSERS,
  GET_CMSUSERS,
  CMSUSERS_ERROR,
  EDIT_CMSUSERS,
} from "../reducers/types";
import axios from "axios";

export const getCmsUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cmsuser`);
    dispatch({
      type: GET_CMSUSERS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: CMSUSERS_ERROR,
      payload: error,
    });
  }
};

export const editCMSUser = (cmsuser) => async (dispatch) => {
  try {
    await axios.put(`/api/cmsuser/${cmsuser.id}`, cmsuser).then((response) => {
      dispatch({
        type: EDIT_CMSUSERS,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: CMSUSERS_ERROR,
      payload: error,
    });
  }
};

export const deleteCmsUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/cmsuser/${id}`).then((response) => {
      dispatch({
        type: DELETE_CMSUSERS,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: CMSUSERS_ERROR,
      payload: error,
    });
  }
};
