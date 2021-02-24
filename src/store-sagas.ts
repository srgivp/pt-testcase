import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from './sagas/root-saga';
// @ts-ignore
import rootReducer from "./reducers/root-reducer";
import {loadState, saveState} from "./support/local-storage";

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const tokenLoaded = loadState();
console.log('tokenLoaded: ', tokenLoaded);

let token = tokenLoaded ? tokenLoaded : null;


console.log('tokenLoadedAgain: ', tokenLoaded);

export const initialState: any = {
    loading: false,
    auth: {
        loading: false,
        isLoggedIn: !!token,
        isAuthReady: !!token,
        token: token as null | string,
        error: null as null | Error,
    }
};

const storeSagas = createStore(rootReducer, initialState, enhancer);
storeSagas.subscribe(() => {
    const state: any = storeSagas.getState();
    const token = state.auth.token;
    console.log('tokenSaved: ', token);
    saveState(token);
});

sagaMiddleware.run(rootSaga);

export default storeSagas;