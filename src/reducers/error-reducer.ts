import {CLEAN_ERROR} from "../actions/action-types";

const errorReducer = (state = {error: null as null | Error}, action: any) => {
    if (action.payload && action.payload.error) {
        return {
            ...state,
            error: action.payload.error
        }
    } else if (action.type === CLEAN_ERROR) {
        return {error: null}
    } else {
        return state;
    }
}

export default errorReducer;