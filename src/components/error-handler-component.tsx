import {useSelector, useDispatch} from "react-redux";
import React, {useEffect} from "react";
import {useToasts} from 'react-toast-notifications';
import {CLEAN_ERROR} from "../actions/action-types";
import {useHistory} from 'react-router-dom';
import signOutAction from "../actions/sign-out-action";
import {StoreState} from "../types/ts-types";

const ErrorHandler = () => {
    const stateError = useSelector((state: StoreState) => state.allErrorsHandler.error);
    const history = useHistory();
    const {addToast} = useToasts();
    const dispatch = useDispatch();
    const cleanError = () => {
        dispatch({type: CLEAN_ERROR});
        if (stateError.message === 'Request failed with status code 403') {
            dispatch(signOutAction());
        }
    };
    useEffect(() => {
        if (stateError) {
            addToast(stateError.message, {
                appearance: 'error',
                onDismiss: id => cleanError()
            })
        }

    }, [stateError])

    return (<div id='error-handler'> </div>)
}

export default ErrorHandler;

