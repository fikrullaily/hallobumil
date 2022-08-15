import axios from "axios";
import {
  GET_ARTIKELMINGGUAN,
  DELETE_ARTIKELMINGGUAN,
  EDIT_ARTIKELMINGGUAN,
  ERROR_ARTIKELMINGGUAN,
} from "../reducers/types";

export const getArtikel = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/artikelmingguan`);
    // let highest = getArtikel.sort((a,b) => b-a);
    dispatch({
      type: GET_ARTIKELMINGGUAN,
      payload: res.data,
      // highest,
    });
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: ERROR_ARTIKELMINGGUAN,
      payload: error,
    });
  }
};

export const editArtikel = (artikel) => async (dispatch) => {
  try {
    await axios
      .put(`/api/artikelmingguan/${artikel.id}`, artikel)
      .then((response) => {
        dispatch({
          type: EDIT_ARTIKELMINGGUAN,
          payload: response.data,
        });
        console.log(response);
      });
  } catch (error) {
    dispatch({
      type: ERROR_ARTIKELMINGGUAN,
      payload: error,
    });
  }
};

export const deleteArtikel = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/artikelmingguan/${id}`).then((response) => {
      dispatch({
        type: DELETE_ARTIKELMINGGUAN,
        payload: response.data,
      });
      console.log(response);
    });
  } catch (error) {
    dispatch({
      type: ERROR_ARTIKELMINGGUAN,
      payload: error,
    });
  }
};
