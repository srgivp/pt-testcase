import {SIGN_IN, SIGN_UP, SIGN_OUT} from "../actions/action-types";

const signedInReducer = (state = null, action: { type: any; data: string; }) => {
    switch (action.type){
        case SIGN_IN:
        case SIGN_UP: {
            return action.data;
        }

        case SIGN_OUT: {
            return null;
        }

        default: {
            return state
        }
    }
}

export  default signedInReducer;