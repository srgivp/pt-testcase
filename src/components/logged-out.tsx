import React from "react";
import {Link} from 'react-router-dom';

const LoggedOutComponent = () => {
    return <div id='logged-out-component'>
        <p>Hi there!</p>
        <p>Please, <Link to='/sign-up'>SIGN UP</Link> or <Link to='/sign-in'>SIGN IN</Link>, if you're already signed up</p>
    </div>
}

export default LoggedOutComponent;