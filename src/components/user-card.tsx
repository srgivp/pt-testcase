import React from 'react';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import { mdiAccountEditOutline, mdiDeleteForeverOutline } from '@mdi/js';
import {IconButton} from "@material-ui/core";
import Icon from '@mdi/react';
import PropTypes from "prop-types";
import {UserCardProps} from "../types/ts-types";
import VisibilitySensor from 'react-visibility-sensor';
import {leadUserCards, pageToFetchDefiner} from "./support/utils";
import {fetchUsersRequest} from "../actions/fetch-users-actions";
import {useUserCard} from "./support/on-click-card";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '20px'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    actions: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1px',
        boxShadow:  '0px 13px 13px #ebf2f5'
},
header: {
        width: '100%',
}
}));



const UserCard = (props: UserCardProps)=>{
    const {state, dispatch, onClickCardEdit, onClickCardDelete} = useUserCard();
    const classes = useStyles();
    const userName=`${props.name} ${props.lastname}`;
    const params: any = useParams();
    const appPage = eval(params.number);
    const orderNumber: number = props.orderNumber;
    const pageToFetch = pageToFetchDefiner(appPage, orderNumber);
    const visibilityOnChange = (isVisible: boolean) => {
        if (isVisible) {
            if (leadUserCards.includes(orderNumber) && props.name === 'Firstname'){
dispatch(fetchUsersRequest(pageToFetch, state.auth.token, orderNumber))
            }
        }
    }
    return <VisibilitySensor onChange={visibilityOnChange}>
        <Card id ={props.id} className={`${classes.root} card`}>
            <CardActions disableSpacing className={classes.actions}>
                <IconButton aria-label='edit card'
                            onClick={()=>{
                                onClickCardEdit(props.id)
                            }}>
                    <Icon path={mdiAccountEditOutline}
                          title="edit card"
                          size={1}
                          horizontal
                          rotate={180}
                          vertical
                          color="#f5d442"
                    />
                </IconButton>
                <IconButton aria-label='delete card'
                            onClick = {()=>{
                                onClickCardDelete(props.id)
                            }}
                >
                    <Icon path={mdiDeleteForeverOutline}
                          title="delete card"
                          size={1}
                          horizontal
                          rotate={180}
                          vertical
                          color="red"/>
                </IconButton>
            </CardActions>
            <Avatar alt={`${props.name} ${props.lastname}`} src={props.img} className={classes.large}/>
            <CardHeader className={classes.header} title={userName} />
        </Card>
    </VisibilitySensor>}

UserCard.propTypes = {
    name: PropTypes.string,
    lastname: PropTypes.string,
    id: PropTypes.string,
    img: PropTypes.string
}

export default UserCard;
