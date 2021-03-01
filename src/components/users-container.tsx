import React, {useEffect} from 'react';
import UserCard from "./user-card";
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import './components.css';
import {UsersContainerProps} from "../types/ts-types";
import {clearUsersInfo, fetchUsersRequest} from "../actions/fetch-users-actions";
import {State} from "../store-sagas";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        // backgroundColor: '#ebf2f5',
        margin: '0',
        padding: '5px',
        maxWidth: '100%'
    }
}));

const UsersContainer = (props: UsersContainerProps) => {
    const state = useSelector((state: State) => state);
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!state.users.quantity && state.auth.token) {
            console.log('defining quantity');
            dispatch(fetchUsersRequest(eval(params.number) - 1, state.auth.token, 0));
        } else if (state.users.quantity) {
            console.log('cleaning users info');
            dispatch(clearUsersInfo(eval(params.number), state.users.quantity));
        }
    }, [params.number, state.users.quantity])

    const userCardsGenerator = (): JSX.Element[] => {
        let cardsArr: JSX.Element[] = [];
        state.users.info.forEach((item, index: number) => {
            const userCard: JSX.Element = (
                <UserCard orderNumber={index} key={item.id.toString()} name={item.firstName} lastname={item.lastName} id={item.id.toString()}
                          img={item.picture}/>);
            cardsArr.push(userCard);
        })
        return cardsArr;
    }

    return <Container className={`flex-container, ${classes.root} users-container`}>
        {userCardsGenerator()}
        {/*{state.users.loading ? Processing() : userCardsGenerator()}*/}
    </Container>

}

UsersContainer.propTypes = {
    users: PropTypes.array
}

export default UsersContainer;