import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import rootSaga from './sagas/root-saga';
// @ts-ignore
import rootReducer from "./reducers/root-reducer";
import {loadState, saveState} from "./support/local-storage";
import {AuthState, StoreState} from "./types/ts-types";
import {initialStateUsersInfoGenerator} from "./components/support/utils";
import {authReducer} from "./reducers/auth-reducer";

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const tokenLoaded = loadState();

let token = tokenLoaded ? tokenLoaded : null;

export const initialState = {
    loading: false,
    allErrorsHandler: {
        error: null as null | object
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
        info: [] as [] | ReturnType<typeof initialStateUsersInfoGenerator>,
        quantity: null as null | number
    }
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