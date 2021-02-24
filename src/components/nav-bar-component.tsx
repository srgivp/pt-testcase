import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import './components.css';
import SignOutButton from "./sign-out-component";


const NavBar = () => {
    const state: any = useSelector((state) => {
        return state;
    });
    return <div id='nav-bar' className='flex-container space-between-container'>
        <div id='sign-out-container'>
            {state.auth.token ? <SignOutButton/> : null}
        </div>
    </div>

}

export default NavBar;