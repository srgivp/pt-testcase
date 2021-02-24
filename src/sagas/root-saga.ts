import {takeEvery, takeLatest} from 'redux-saga/effects';
import {AUTH_INIT_FETCHING_ACTION, DISPLAY_USER_ACTION, SIGN_IN_ACTION, SIGN_UP_ACTION} from "../actions/action-types";
//import {authInitFetchingSaga} from "./auth-init-fetching-saga";
//import {displayUserSaga} from "./display-user-saga";
import {signInSaga} from "./sign-in-saga";
//import signOutAction from "../actions/sign-out-action";


export default function* rootSaga() {
    // yield takeEvery(AUTH_INIT_FETCHING_ACTION, authInitFetchingSaga);
    // yield takeEvery(DISPLAY_USER_ACTION, displayUserSaga);
    yield takeEvery(SIGN_IN_ACTION, signInSaga);
    yield takeEvery(SIGN_UP_ACTION, signInSaga);
}