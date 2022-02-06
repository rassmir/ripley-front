import {
    ADD_CLIENT,
    DELETE_CLIENT,
    ERROR_CLIENT,
    GET_ALL_CLIENTS,
    LOAD_CLIENT,
    UPDATE_CLIENT
} from "../types/clientsTypes";

const INITIAL_STATE = {
    clients: [],
    load: false
}

const clientsReducers = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_ALL_CLIENTS:
            return {
                ...state,
                clients: payload,
                load: false
            }
        case ADD_CLIENT:
            return {
                ...state,
                clients: [...state.clients, payload]
            }
        case UPDATE_CLIENT:
            return {
                ...state,
                clients: state.clients.map(client => client.id === payload.id ? payload : client)
            }
        case DELETE_CLIENT:
            return {
                ...state,
                clients: state.clients.filter(client => client.id !== payload)
            }
        case LOAD_CLIENT:
            return {...state, load: true}
        case ERROR_CLIENT:
            return {...state, error: payload, load: false}
        default:
            return state;
    }
}
export default clientsReducers;