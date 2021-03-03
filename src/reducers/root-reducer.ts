import loadingReducer from "./loading-reducer";
import { combineReducers } from "redux";
import {authReducer} from "./auth-reducer";
import {usersReducer} from "./users-reducer";
import errorReducer from "./error-reducer";
import {detailsReducer} from "./details-reducer";

const rootReducer = combineReducers({
    loading: loadingReducer,
    auth: authReducer,
    users: usersReducer,
    allErrorsHandler: errorReducer,
    user: detailsReducer
});

export default rootReducer;