import {call, put, SagaReturnType} from 'redux-saga/effects';
import {fetchUsersError, fetchUsersRequest, fetchUsersSuccess} from "../actions/fetch-users-actions";
import {fetchDataFromApiAuth} from "../support/axios";

export function* fetchUsersSaga(action: ReturnType<typeof fetchUsersRequest>) {
    try {
        const {pageNumber, token, orderNumber} = action.payload;
        const response: SagaReturnType<typeof fetchDataFromApiAuth> = yield call(fetchDataFromApiAuth, pageNumber, token);
        const {usersPortion, total} = response;
        yield put(fetchUsersSuccess(usersPortion, total, orderNumber))
    } catch (e) {
        yield put(fetchUsersError(e))
    }
}