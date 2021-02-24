import {call, put, SagaReturnType} from 'redux-saga/effects';
import {SIGN_UP_REQUEST} from "../actions/action-types";
import {sendCredentials, signInToApi} from "../support/axios";
import {signInRequest, signUpRequest, signInSuccess, signInFailed} from "../actions/sign-in-actions";

export function* signInSaga(action: ReturnType<typeof signInRequest> | ReturnType<typeof signUpRequest>) {
    try {
        const {password, username} = action.payload;
        let response: SagaReturnType<typeof signInToApi> | SagaReturnType<typeof sendCredentials>;
        if (action.type === SIGN_UP_REQUEST) {
            response = yield call(sendCredentials, username, password);
        } else {
            response = yield call(signInToApi, username, password);
        }
        yield put(signInSuccess(response.data.token))
    } catch (e) {
        yield put(signInFailed(e))
    }
}