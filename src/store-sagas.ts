import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import rootSaga from './sagas/root-saga';
import rootReducer from "./reducers/root-reducer";
import {loadState, saveState} from "./support/local-storage";

const sagaMiddleware = createSagaMiddleware();
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))

const tokenLoaded = loadState();

let token = tokenLoaded ? tokenLoaded : null;

const initialState = {
    loading: false,
    token: token
};

export type StoreState = ReturnType<typeof rootReducer>;

const storeSagas = createStore(rootReducer, initialState, enhancer);
storeSagas.subscribe(() => {
    const state = storeSagas.getState();
    const token = state.token;
    saveState(token);
});

sagaMiddleware.run(rootSaga);

export default storeSagas;