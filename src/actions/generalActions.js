import axios from "axios";
import {fail, successfull} from "../utils/Swal";

const SERVER_URL = process.env["REACT_APP_SERVER_URL"];

export const getAll = (url, type_load, type_success, type_error) => async dispatch => {
    dispatch({
        type: type_load
    })
    try {
        const response = await axios.get(SERVER_URL + url);
        dispatch({
            type: type_success,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: type_error,
            payload: error.message
        })
    }
}

export const postAll = (
    url,
    data = [],
    type_success,
    type_error,
    message,
    text_success,
    text_error
) => async dispatch => {
    await axios.post(SERVER_URL + `${url}`, data)
        .then(response => {
            if (message === true) {
                successfull(text_success);
            }
            dispatch({
                type: type_success,
                payload: response.data
            });
        })
        .catch(error => {
            fail(text_error);
            dispatch({
                type: type_error,
                payload: error.message
            });
        });
};

export const updateAll = (uri, id, data = [], type_success, type_error,text_success, text_error) => async dispatch => {
    await axios.put(SERVER_URL + `${uri}/${id}`, data)
        .then((response) => {
            successfull(text_success);
            dispatch({
                type: type_success,
                payload: response.data
            });
        })
        .catch((error) => {
            fail(text_error);
            dispatch({
                type: type_error,
                payload: error.message
            });
        });
};

export const deleteAll = (
    uri,
    id,
    type_success,
    type_error,
    text_success, text_error
) => async dispatch => {
    await axios.delete(SERVER_URL + `${uri}/${id}`)
        .then((response) => {
            successfull(text_success);
            dispatch({
                type: type_success,
                payload: id
            });
        })
        .catch((error) => {
            fail(text_error);
            dispatch({
                type: type_error,
                payload: error.message
            });
        });
};