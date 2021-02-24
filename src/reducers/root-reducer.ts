
import loadingReducer from "./loading-reducer";
import { combineReducers } from "redux";
import signedInReducer from "./signed-in-reducer";
import auth from "./auth-reducer";

const rootReducer=combineReducers({
    loading: loadingReducer,
    token: signedInReducer,
    auth,
});

export default rootReducer;