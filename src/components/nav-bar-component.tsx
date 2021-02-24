import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import './components.css';
import SignOutButton from "./sign-out-component";
import {State, NavBarProps, LinkRouterProps} from "../types/ts-types";


const NavBar = () => {
    const state = useSelector((state: State) => {
        return state;
    });
    const history = useHistory();

    useEffect(() => {
        if (!state.token) {
            history.push('/unsigned');
        }
    }, [state.token, history])

    return <div id='nav-bar' className='flex-container space-between-container'>
        <div id='sign-out-container'>
            {state.token ? <SignOutButton/> : null}
        </div>
    </div>

}

export default NavBar;