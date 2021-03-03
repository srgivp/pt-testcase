import {
    FETCH_DETAILS_ERROR,
    FETCH_DETAILS_REQUEST,
    FETCH_DETAILS_SUCCESS,
    CLEAN_DETAILS_INFO,
    DISPLAY_EXISTING_USER, EDIT_USER
} from "../actions/action-types";
import {UserState} from "../support/axios";
import {FetchDetailsActions} from "../actions/fetch-details-actions";



export const userInitialState = {
    loading: false,
    info: null as null | UserState,
    error: null as null | Error
}

export const detailsReducer= (state = userInitialState, action: FetchDetailsActions) => {
switch (action.type) {
    case FETCH_DETAILS_REQUEST: {
        return {
            loading: true,
            info: null,
            error: null
        }
    }
    case FETCH_DETAILS_SUCCESS: {
        return {
            loading: false,
            info: action.payload.details,
            error: null
        }
    }
    case FETCH_DETAILS_ERROR: {
        return {
            ...state,
            loading: false,
            error: action.payload.error
        }
    }
    case CLEAN_DETAILS_INFO: {
        return userInitialState;
    }
    case DISPLAY_EXISTING_USER: {
        return {
            loading: false,
            info: action.payload.details,
            error: null
        }
    }
    case EDIT_USER: {
        let stateBeforeEditing = JSON.parse(JSON.stringify(state));
        return {...stateBeforeEditing.info, ...action.payload.details}
    }
    default: {
        return state
    }
}
}
