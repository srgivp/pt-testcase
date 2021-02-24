
import loadingReducer from "./loading-reducer";
import { combineReducers } from "redux";
import signedInReducer from "./signed-in-reducer";

const rootReducer=combineReducers({
    loading: loadingReducer,
    token: signedInReducer
});

export default rootReducer;