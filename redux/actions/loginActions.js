import {
  LOGIN,
  LOGOUT,
  ERROR,
  GET_LOGIN,
  LOGIN_ERROR,
} from "../reducers/types";
import axios from "axios";
import Cookie from "js-cookie";
import Swal from "sweetalert2";

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:3000/api/login`, user);
    Cookie.set("token", res.data.token);
    Cookie.set("id_identifier", res.data.user.id_identifier);
    Cookie.set("username", res.data.username);
    Swal.fire("Welcome", "Welcome " + Cookie.get("username"), "info");
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: ERROR,
      payload: errors,
    });
    console.log(errors);
  }
};

export const logoutUser = (user) => async (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: user,
  });
  console.log("berhasil logout");
};
