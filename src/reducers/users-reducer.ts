import {
    CLEAR_USERS_INFO, EDIT_USER, FETCH_DETAILS_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    SIGN_OUT,
    DELETE_USER
} from "../actions/action-types";
import {FetchUsersActions} from "../actions/fetch-users-actions";
import {fetchingStep, initialStateUsersInfoGenerator} from "../components/support/utils";

const INITIAL_STATE = {
    loading: false,
    error: null as null | Error,
    info: [] as [] | ReturnType<typeof initialStateUsersInfoGenerator>,
    quantity: null as null | number
}

export const usersReducer = (state = INITIAL_STATE, action: FetchUsersActions) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        case FETCH_USERS_SUCCESS: {
            const {usersPortion, orderNumber} = action.payload;
            const previousState = JSON.parse(JSON.stringify(state));
            let usersInfoUpdated = previousState.info;
            usersInfoUpdated.splice(orderNumber, fetchingStep, ...usersPortion);
            return {
                loading: false,
                error: null,
                info: usersInfoUpdated,
                quantity: state.quantity ? state.quantity : action.payload.total
            }
        }
        case FETCH_USERS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        }
        case SIGN_OUT: {
            return {
                loading: false,
                error: null,
                info: [],
                quantity: null
            }
        }
        case CLEAR_USERS_INFO: {
            const {pageNumber, quantity} = action.payload;
            return {
                ...state,
                info: initialStateUsersInfoGenerator(pageNumber, quantity)
            }
        }
        case FETCH_DETAILS_SUCCESS: {
            let stateBeforeDetails = JSON.parse(JSON.stringify(state));
            const {details} = action.payload;
            const id  = details.id;
            for (let i = 0; i < stateBeforeDetails.info.length; i++) {
                if (stateBeforeDetails.info[i].id === id) {
                    stateBeforeDetails.info[i].details = details;
                    break;
                }
            }
            return stateBeforeDetails;
        }
        case EDIT_USER: {
            let stateBeforeEditing = JSON.parse(JSON.stringify(state));
            const {details} = action.payload;
            const id  = details.id;
            for (let i = 0; i < stateBeforeEditing.info.length; i++) {
                if (stateBeforeEditing.info[i].id === id) {
                    stateBeforeEditing.info[i] = {...stateBeforeEditing.info[i], ...action.payload.details};
                    stateBeforeEditing.info[i].details = {...stateBeforeEditing.info[i].details, ...action.payload.details};
                    break;
                }
            }
            return stateBeforeEditing;
        }
        case DELETE_USER: {
            let stateBeforeDelete = JSON.parse(JSON.stringify(state));
            stateBeforeDelete.info = stateBeforeDelete.info.filter(item => item.id !== action.payload.id);
            return stateBeforeDelete;
        }
        default: {
            return state
        }
    }
}
