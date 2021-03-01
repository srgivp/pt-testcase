import {takeEvery} from 'redux-saga/effects';
import {
    SIGN_IN_REQUEST, SIGN_UP_REQUEST, FETCH_USERS_REQUEST
} from "../actions/action-types";
import {signInSaga} from "./sign-in-saga";
import {fetchUsersSaga} from "./fetch-users-saga";


export default function* rootSaga() {
    // yield takeEvery(AUTH_INIT_FETCHING_ACTION, authInitFetchingSaga);
    // yield takeEvery(DISPLAY_USER_ACTION, displayUserSaga);
    yield takeEvery(SIGN_IN_REQUEST, signInSaga);
    yield takeEvery(SIGN_UP_REQUEST, signInSaga);
    yield takeEvery(FETCH_USERS_REQUEST, fetchUsersSaga)
}