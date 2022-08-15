import {
  DELETE_USERS,
  EDIT_USERS,
  GET_USERS,
  USERS_ERROR,
} from "../reducers/types";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/users`);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    await axios.put(`/api/users/${user.id}`, user).then((response) => {
      dispatch({
        type: EDIT_USERS,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const deleteUsers = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/users/${id}`).then((response) => {
      dispatch({
        type: DELETE_USERS,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};
