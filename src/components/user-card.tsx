import React from 'react';
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import { mdiAccountEditOutline, mdiDeleteForeverOutline } from '@mdi/js';
import {IconButton} from "@material-ui/core";
import Icon from '@mdi/react';
import PropTypes from "prop-types";
// import {onClickCardEdit, onClickDelete} from "./on-click-card";
import {StoreState, UserCardProps} from "../types/ts-types";
//import './components.css'
import VisibilitySensor from 'react-visibility-sensor';
import {leadUserCards, pageToFetchDefiner} from "./support/utils";
import {fetchUsersRequest} from "../actions/fetch-users-actions";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '20px',
        //position: 'relative'
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
    const state: any = useSelector((state: StoreState)=>{return state});
    const dispatch = useDispatch();
    const classes = useStyles();
    // const token = state.auth.token;
    const userName=`${props.name} ${props.lastname}`;
    const params: any = useParams();
    const appPage = eval(params.number);
    const pageToFetch = pageToFetchDefiner(appPage, props.orderNumber);
    const visibilityOnChange = (isVisible: boolean) => {
        if (isVisible) {
            if (leadUserCards.includes(props.orderNumber) && props.name === 'Firstname'){
dispatch(fetchUsersRequest(pageToFetch, state.auth.token, props.orderNumber))
            }
        }
    }
    return <VisibilitySensor onChange={visibilityOnChange}>
        <Card id ={props.id} className={`${classes.root} card`}>
            <CardActions disableSpacing className={classes.actions}>
                {/*<Link to={`${props.link}/person?id=${props.id}`}>*/}
                <IconButton aria-label='edit card'
                            onClick={()=>{
                                // onClickCardEdit(state, dispatch, props.link, props.id, token, props.addToast)
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
                {/*</Link>*/}
                <IconButton aria-label='delete card'
                            onClick = {()=>{
                                // onClickDelete(dispatch, props.id)
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
