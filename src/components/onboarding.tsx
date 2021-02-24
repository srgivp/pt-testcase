import React, {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from 'react-hook-form';
import { useAuth } from "../reducers/auth-reducer";
import {signInSagaAction} from "../sagas/sign-in-saga";
// @ts-ignore
import {signUpSagaAction} from "../sagas/sign-in-saga";
import './components.css';
import {useHistory} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {OnBoardingProps, State, OnboardingFormData, AddToast, OnboardingSagaData} from "../types/ts-types";

const Onboarding = (action: any, buttonName: string) => {
    const {onSignIn} = useAuth();

    const history = useHistory();
    const { register, handleSubmit, errors, watch } = useForm<OnboardingFormData>();
    const password=useRef({});
    password.current = watch('password', '');

    // useEffect(() => {
    //     if (state.users.length>0){
    //         history.push('/users-page-1');
    //     }
    // }, [state.users.length, history])

    return (
        <div id='onboarding-container' className='form-container'>
            <h2>{buttonName} to proceed</h2>
            <form id='onboarding-form' onSubmit={handleSubmit(onSignIn)}>
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
    return Onboarding(signUpSagaAction, 'Sign up');
}

export const SignInComponent = () => {
    return Onboarding(signInSagaAction, 'Sign in');
}

export default Onboarding;