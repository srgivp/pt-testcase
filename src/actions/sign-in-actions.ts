import {SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR, SIGN_UP_REQUEST} from "./action-types";

export const signInRequest = (username: string, password: string) => ({
    type: SIGN_IN_REQUEST,
    payload: {
        username,
        password,
    }
});

export const signUpRequest = (username: string, password: string) => ({
    type: SIGN_UP_REQUEST,
    payload: {
        username,
        password,
    }
});

export const signInSuccess = (token: string) => ({
    type: SIGN_IN_SUCCESS,
    payload: {
        token
    }
});

export const signInFailed = (error: Error) => ({
    type: SIGN_IN_ERROR,
    payload: {
        error
    }
});