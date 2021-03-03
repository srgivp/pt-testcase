import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import rootSaga from './sagas/root-saga';
// @ts-ignore
import rootReducer from "./reducers/root-reducer";
import {loadState, saveState} from "./support/local-storage";
import {AuthState, UsersItem} from "./types/ts-types";
import {userInitialState} from "./reducers/details-reducer";

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const tokenLoaded = loadState();

let token = tokenLoaded ? tokenLoaded : null;

export type UsersInfo = UsersItem[];

export const initialState = {
    loading: false,
    allErrorsHandler: {
        error: null as null | Error
    },
    auth: {
        loading: false,
        isLoggedIn: !!token,
        isAuthReady: !!token,
        token: token as null | string,
        error: null as null | Error,
    } as AuthState,
    users: {
        loading: false,
        error: null as null | Error,
        info: [] as [] | UsersInfo,
        quantity: null as null | number
    },
    user: userInitialState
};

export type State = typeof initialState;

const storeSagas = createStore(rootReducer, initialState, enhancer);
storeSagas.subscribe(() => {
    const state: State = storeSagas.getState();
    const token = state.auth.token;
    if (token){saveState(token)} ;
});

sagaMiddleware.run(rootSaga);

export default storeSagas;