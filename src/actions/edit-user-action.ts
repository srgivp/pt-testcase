import {EDIT_USER} from "./action-types";

export const editUserAction = (details) => {
    return {
        type: EDIT_USER,
        payload: {
            details
        }
    }
}
