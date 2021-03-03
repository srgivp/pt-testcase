import {deleteUserAction} from '../../actions/fetch-users-actions';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store-sagas";
import {useCallback} from "react";
import {useHistory, useLocation} from 'react-router-dom';

export const useUserCard = () => {
    const state = useSelector((state: State) => state);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const onClickCardEdit = useCallback((id: string) => {
        history.push(`${location.pathname}/user/${id}`, {from: location})
    }, []);
    const onClickCardDelete = useCallback((id: string) => {
        dispatch(deleteUserAction(id));
    }, [])
    return {
        state,
        dispatch,
        location,
        history,
        onClickCardEdit,
        onClickCardDelete
    }
}
