import {Reducer} from "react";
import {AuthActions} from "../types/ts-types";
import {SIGN_IN_ERROR, SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_OUT, SIGN_UP_REQUEST} from "../actions/action-types";

const INITIAL_STATE = {
    loading: false,
    isLoggedIn: false,
    isAuthReady: false,
    token: null as null | string,
    error: null as null | Error,
}

export const authReducer: Reducer<typeof INITIAL_STATE, AuthActions> = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null
            }
        }
        break;
        case SIGN_IN_SUCCESS: {
            const {token} = action.payload;
            return {
                ...state,
                loading: false,
                token,
                error: null,
                isAuthReady: true,
                isLoggedIn: !!token
            }
        }
        break;
        case SIGN_IN_ERROR: {
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error,
                isAuthReady: true
            }
        }
        break;
        case SIGN_OUT: {
            return {
                loading: false,
                isLoggedIn: false,
                isAuthReady: false,
                token: null,
                error: null
            }
        }
        break;
        default: {
            return state;
        }
    }
}

