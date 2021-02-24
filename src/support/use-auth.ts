import {useSelector, useDispatch} from "react-redux";
import {StoreState} from "../types/ts-types";
import {useCallback} from "react";
import {signInRequest, signUpRequest} from "../actions/sign-in-actions";

export default function useAuth() {
    const {isAuthReady, token, isLoggedIn, error, loading} = useSelector((state: StoreState) => state.auth);
    const dispatch = useDispatch();

    const onSignIn = useCallback((action: (login: string, password: string) => ReturnType<typeof signInRequest> | ReturnType<typeof signUpRequest>, {
        login,
        password
    }: { login: string, password: string }) => dispatch(action(login, password)), [dispatch])

    return {
        isAuthReady,
        token,
        isLoggedIn,
        error,
        loading,
        onSignIn
    }
}
