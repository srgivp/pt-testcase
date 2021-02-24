import React from "react";
import Button from '@material-ui/core/Button';
import signOutAction from "../actions/sign-out-action";
import {useDispatch} from "react-redux";
import './components.css';

const SignOutButton = () => {
    const dispatch = useDispatch();
    return <Button id='sign-out' className='action-button' variant='contained' size="medium" onClick={() => {dispatch(signOutAction())}}>
        Sign out
    </Button>
}

export default SignOutButton;