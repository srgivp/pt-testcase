import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm, Controller} from 'react-hook-form';
import {IconButton} from '@material-ui/core';
import './components.css'
import {Avatar, Slider} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useHistory, useParams} from 'react-router-dom';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from "@material-ui/core/Button";
import {State} from "../store-sagas";
import {UserInfoFormData} from "../types/ts-types";
import {CLEAN_DETAILS_INFO} from "../actions/action-types";
import {displayExistingUserAction} from "../actions/dispaly-existing-user-action";
import {fetchDetailsRequest} from "../actions/fetch-details-actions";
import {editUserAction} from "../actions/edit-user-action";
import {onChangeDateOfBirth, onChangeAge} from "./support/user-info-utils";

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(17),
        height: theme.spacing(17),
    }
}));

interface PropsAge {
    years: number
}

const Age = (props: PropsAge) => {
    return <div>{props.years}</div>
}

const UserInfo = (props) => {
    const state = useSelector((state: State) => state);
    const dispatch = useDispatch();
    let history = useHistory();
    let {location} = props;
    const params: {number: string, id: string} = useParams();
    const classes = useStyles();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch
    } = useForm<UserInfoFormData>(/*{defaultValues: {years: 0}}*/);
    let age: number;
    let dateOfBirth: Date;
    if (state.user.info) {
        // @ts-ignore
        age = watch('age', state.user.info.age);
        dateOfBirth = watch('dateOfBirth', new Date(state.user.info.dateOfBirth));
    }

    useEffect(() => {
        const {id} = params;
        if (state.users.info.length < 1) {
            dispatch(fetchDetailsRequest(id, state.auth.token))
        } else {
            for (let i = 0; i < state.users.info.length; i++) {
                if (state.users.info[i].id === id) {
                    dispatch({type: CLEAN_DETAILS_INFO});
                    if (state.users.info[i].details) {
                        // @ts-ignore
                        dispatch(displayExistingUserAction(state.users.info[i].details))
                    } else {
                        if (state.auth.token) {
                            dispatch(fetchDetailsRequest(id, state.auth.token))
                        };
                        // }
                        break;
                    }
                }
            }}
    }, [] )

    return (<> {state.user.info ? <div id='user-info' className='form-container'>
            <IconButton aria-label='get back'
                        id='get-back'
                onClick={() => {
                    history.push(location.state.from.pathname, {params});
                }}
            >
                <ForwardIcon className='turn180' color='primary' style={{fontSize: 75}} rotate={180}/>
            </IconButton>
            <div>
                <Avatar alt={`${state.user.info.firstName} ${state.user.info.lastName}`} src={state.user.info.picture}
                        className={classes.large}/>

            </div>
            <form id='user-form' onSubmit={handleSubmit(((data) => {
                data.id = state.user.info.id;
                dispatch(editUserAction(data));
                history.push(location.state.from.pathname, {params});
            }))}>
                <div className='form-group'>
                    <label htmlFor='firstName'>Firstname: </label>
                    <input className='textInput' name="firstName" type='firstName' ref={register}
                           defaultValue={state.user.info.firstName}/></div>
                <div className='form-group'>
                    <label htmlFor='firstName'>Lastname: </label>
                    <input className='textInput' name="lastName" type='lastName' ref={register}
                           defaultValue={state.user.info.lastName}/></div>
                <div className='form-group'>
                    <label htmlFor='title'>Title: </label>
                    <select name="title" ref={register}>
                        <option className='title-selection' value={state.user.info.title}
                                selected={true}>{state.user.info.title}</option>
                        <option className='title-selection' value="miss">miss</option>
                        <option className='title-selection' value="mrs">mrs</option>
                        <option className='title-selection' value="mr">mr</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='age'>Age: </label>
                    <Age years={age}/>
                </div>

                <div className='form-group'>
                    <label htmlFor='age'>Change age: </label>
                    <Controller
                        name='age'
                        control={control}
                        render={() =>
                            <Slider
                                defaultValue={state.user.info ? state.user.info.age : 5}
                                onChange={(event, value: number | number[]) => {
                                    onChangeAge(event, value, setValue);
                                }}
                                step={1} max={150} valueLabelDisplay="auto"/>
                        }
                    />

                </div>

                <div className='form-group'>
                    <label htmlFor='dateOfBirth'>Birthday date: </label>
                    <Controller
                        name='dateOfBirth'
                        type='dateOfBirth'
                        defaultValue={new Date(state.user.info.dateOfBirth)}
                        control={control}
                        render={() =>
                            <DatePicker name='dateOfBirth' selected={dateOfBirth} onChange={(date: Date) => {
                                onChangeDateOfBirth(date, setValue);
                            }}/>
                        }
                    />
                </div>
                <Button type='submit' id='save' className='action-button' variant='contained' size="medium">
                    Save
                </Button>
            </form>
        </div> : <div>There is no information about separate user</div>} </>

    )

}

export default UserInfo;
