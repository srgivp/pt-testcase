
import loadingReducer from "./loading-reducer";
import { combineReducers } from "redux";
import {authReducer} from "./auth-reducer";

const rootReducer=combineReducers({
    loading: loadingReducer,
    auth: authReducer
});

export default rootReducer;