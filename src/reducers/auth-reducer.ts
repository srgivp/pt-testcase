import { Reducer, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { call, put, SagaReturnType } from "redux-saga/effects";
import { SIGN_IN, SIGN_UP, SIGN_OUT, SIGN_IN_ACTION } from "../actions/action-types";
import loadedAction from "../actions/loaded-action";
import loadingAction from "../actions/loading-action";
import { StoreState } from "../store-sagas";
import { sendCredentials, signInToApi } from "../support/axios";
import { OnboardingSagaAction, SignToApiResponse, SignToApiResponseData } from "../types/ts-types";

const SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST' as const;
const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS' as const;
const SIGN_IN_ERROR = '@auth/SIGN_IN_ERROR' as const;


const signInRequest = (username: string, password: string) => ({
    type: SIGN_IN_REQUEST,
    payload: {
        username,
        password,
    }
});

const signInSuccess = (token: string) => ({
    type: SIGN_IN_SUCCESS,
    payload: {
        token
    }
});

const signInFailed = (error: Error) => ({
    type: SIGN_IN_ERROR,
    payload: {
        error
    }
});

type AuthActions = ReturnType<typeof signInRequest | typeof signInSuccess | typeof signInFailed>


export function useAuth() {
    const {isAuthReady, token, isLoggedIn, error,loading} = useSelector((state: StoreState) => state.auth);
    const dispatch = useDispatch();

    const onSignIn = useCallback( ({login, password}: {login: string, password: string}) => dispatch(signInRequest(login, password)), [dispatch])

    return {
        isAuthReady,
        token,
        isLoggedIn,
        error,
        loading,
        onSignIn
    }
}


const INITIAL_STATE = {
    loading: false,
    isLoggedIn: false,
    isAuthReady: false,
    token: null as null | string,
    error: null as null | Error,
}

const authReducer: Reducer<typeof INITIAL_STATE, AuthActions> = (state, action) => {
    switch (action.type){
        case SIGN_IN_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            }
        }
        case SIGN_IN_SUCCESS: {
            const {token} = action.payload;
            return {
                ...state,
                loading: false,
                error: null,
                token,
                isLoggedIn: !!token,
                isAuthReady: true,
            }
        }

        case SIGN_IN_ERROR: {
            const {error} = action.payload;
            return {
                ...state,
                loading: false,
                error,
                isAuthReady: true,
            }
        }

        default: {
            return state
        }
    }
}

export  default authReducer;

export function* signInSaga(action: ReturnType<typeof signInRequest>) {
   try {
       const {password, username} = action.payload;
       const response: SagaReturnType<typeof signInToApi> = yield call(signInToApi, username, password);
       yield put(signInSuccess(response.data.token))
   } catch (e) {
       yield put(signInFailed(e))
   }
}
