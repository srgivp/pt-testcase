import {
    CLEAR_USERS_INFO,
    DELETE_USER,
    FETCH_USERS_ERROR,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS
} from "./action-types";
import signOutAction from "./sign-out-action";
import {UsersItem} from "../types/ts-types";
import {fetchDetailsSuccess} from "./fetch-details-actions";
import {editUserAction} from "./edit-user-action";

export const fetchUsersRequest = (pageNumber: number, token: string, orderNumber: number) => {
    return {
        type: FETCH_USERS_REQUEST,
        payload: {pageNumber, token, orderNumber}
    }
}

export const fetchUsersSuccess = (usersPortion: UsersItem[], total: number, orderNumber: number) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: {
            usersPortion,
            total,
            orderNumber
        }
    }
}

export const fetchUsersError = (error: Error) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: {
            error
        }
    }
}

export const clearUsersInfo = (pageNumber: number, quantity: number) => {
    return {
        type: CLEAR_USERS_INFO,
        payload: {
            pageNumber,
            quantity
        }
    }
}

export const deleteUserAction = (id) => {
    return {
        type: DELETE_USER,
        payload: {id}
    }
}

export type FetchUsersActions = ReturnType<typeof fetchUsersError | typeof fetchUsersRequest | typeof fetchUsersSuccess | typeof signOutAction | typeof clearUsersInfo | typeof fetchDetailsSuccess | typeof editUserAction | typeof deleteUserAction>;