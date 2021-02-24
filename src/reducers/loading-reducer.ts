import {LOADING, LOADED} from "../actions/action-types";

const loadingReducer = (state=false, action: { type: string; }) => {
    switch (action.type) {
        case LOADING: {
            return true
        }
        case LOADED: {
            return false
        }
        default: {
            return state
        }
    }
}

export default loadingReducer;