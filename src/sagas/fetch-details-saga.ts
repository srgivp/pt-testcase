import {call, put, SagaReturnType} from 'redux-saga/effects';
import {fetchDetailsError, fetchDetailsRequest, fetchDetailsSuccess} from "../actions/fetch-details-actions";
import {fetchDetailsFromApi} from "../support/axios";

export function* fetchDetailsSaga(action: ReturnType<typeof fetchDetailsRequest>) {
try {
    const {id, token} = action.payload;
    const details: SagaReturnType<typeof fetchDetailsFromApi> = yield call(fetchDetailsFromApi, id, token);
    yield put(fetchDetailsSuccess(details))
} catch (e) {
    yield put(fetchDetailsError(e))
}
}