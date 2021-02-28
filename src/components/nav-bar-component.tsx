import React from "react";
import {useSelector} from "react-redux";
import './components.css';
import SignOutButton from "./sign-out-component";
import linksGenerator from "./support/links-generator";
import ErrorHandler from './error-handler-component'
import {StoreState} from "../types/ts-types";


const NavBar = () => {
    const state: StoreState = useSelector((state: StoreState) => {
        return state;
    });
    return <div id='nav-bar' className='flex-container space-between-container'>
        {ErrorHandler()}
        <div id='pagination' className='flex-container component-container'>
            {state.users.quantity ? <><span>pages:</span>{linksGenerator(state.users.quantity)}</>  : null}
        </div>
        <div id='sign-out-container'>
            {state.auth.token ? <SignOutButton/> : null}
        </div>
    </div>

}

export default NavBar;