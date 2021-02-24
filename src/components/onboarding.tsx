import React, {useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from 'react-hook-form';
import './components.css';
import {useHistory, Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {State, OnboardingFormData} from "../types/ts-types";
import useAuth from "../support/use-auth";
import {signInRequest, signUpRequest} from "../actions/sign-in-actions";

const Onboarding = (action: any, buttonName: string) => {
    const history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm<OnboardingFormData>();
    const password=useRef({});
    password.current = watch('password', '');
    const {onSignIn} = useAuth();

    return (
        <div id='onboarding-container' className='form-container'>
            <h2>{buttonName} to proceed</h2>
            <form id='onboarding-form' onSubmit={handleSubmit((data)=>{
                onSignIn(action, data);
                history.push('/users-page-1')
            })}>
                <div className='form-fields-container'>
                    <div className='form-group'>
                        <label htmlFor='login'>Login: </label>
                        <input className='textInput' name="login" ref={register({
                            required: "You must specify a login",
                            minLength: {
                                value: 5,
                                message: "Login must have at least 5 characters"
                            },
                            pattern: {
                                value: /^[A-Za-z-_]+$/,
                                message: 'Login can include only literals and "-" or "_" symbols one or more capitalized letters',
                            }
                        })} />
                        {errors.login && <p>{errors.login.message}</p>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password: </label>
                        <input type='password' className='textInput' name="password" ref={register({
                            required: "You must specify a password",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            },
                            pattern: {
                                value: /.*[A-Z].*/,
                                message: "Password must include one or more capitalized letters",
                            },
                            validate: {
                                hasDigit: value => /.*\d.*/.test(value) || "Password must include one or more digits",
                                hasSpecialCharacter: value => /.*[/\\~!@#$%^&*()_+-].*/.test(value) || "Password must include one or more \\~!@#$%/^&*()_+- characters"
                            }
                        })} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <Button type='submit' className='action-button' variant='contained' size="medium">
                        {buttonName}
                    </Button>
                </div>
            </form>


        </div>
    )
}

export const SignUpComponent = () => {
    return Onboarding(signUpRequest, 'Sign up');
}

export const SignInComponent = () => {
    return <div>
        {Onboarding(signInRequest, 'Sign in')}
        <div>or <Link to='/sign-up'>create new account</Link> if you aren't signed up yet</div>
    </div>
}

export default Onboarding;