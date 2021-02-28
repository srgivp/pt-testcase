import React, {useEffect} from 'react';
import UserCard from "./user-card";
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import './components.css';
import {UsersContainerProps, UsersItem, StoreState} from "../types/ts-types";
import {clearUsersInfo, fetchUsersRequest} from "../actions/fetch-users-actions";


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

type User = {
    id: number,
    firstName: string,
    lastName: string,
    picture: string,
}

const UsersContainer = (props: UsersContainerProps) => {
    const state: any = useSelector((state: StoreState) => state);
    const classes = useStyles();
    const params: any = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!state.users.quantity) {
            console.log('defining quantity');
            dispatch(fetchUsersRequest(eval(params.number) - 1, state.auth.token, 0));
        } else {
            console.log('cleaning users info');
            dispatch(clearUsersInfo(eval(params.number), state.users.quantity));
        }
    }, [params.number, state.users.quantity])

    const userCardsGenerator = (): JSX.Element[] => {
        let cardsArr: JSX.Element[] = [];
        state.users.info.forEach((item: UsersItem, index: number) => {
            const userCard: JSX.Element = (
                <UserCard orderNumber={index} key={item.id} name={item.firstName} lastname={item.lastName} id={item.id}
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