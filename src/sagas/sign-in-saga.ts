import {call, put} from 'redux-saga/effects';
import {SIGN_IN, SIGN_IN_ACTION, SIGN_UP_ACTION} from "../actions/action-types";
import {sendCredentials, signInToApi} from "../support/axios";
import loadedAction from "../actions/loaded-action";
import loadingAction from "../actions/loading-action";
// @ts-ignore
import {OnboardingSagaData, OnboardingSagaAction, SignToApiResponse, SignToApiResponseData} from "../types/ts-types";

export const signInSagaAction = (data: OnboardingSagaData) => {
    return {
        type: SIGN_IN_ACTION,
        data
    }
}

export const signUpSagaAction = (data: OnboardingSagaData) => {
    return {
        type: SIGN_UP_ACTION,
        data
    }
}

export function* signInSaga(action: OnboardingSagaAction): Generator<object, void, SignToApiResponse> {
    const {type} = action;
    const {data} = action.data;
    const {login, password} = data;
    let signInData: SignToApiResponse | SignToApiResponseData;
    let token: string;
    yield put(loadingAction());
    try {
        if (type===SIGN_IN_ACTION) {
            signInData = yield call(signInToApi, login, password);
            token = signInData.data.token;
        } else {
            signInData = yield call(sendCredentials, login, password);
            token = signInData.data.token;
        }
    } catch (err) {
        console.log(err.name, err.message);
        yield put(loadedAction())
        return;
    }
    yield put(loadedAction());

    yield put({
        type: SIGN_IN,
        data: token
    })
}
