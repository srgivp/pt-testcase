import axios, {AxiosStatic, AxiosPromise} from "axios";
import {fetchingStep, usersOnPage} from "../components/support/utils";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const APP_ID = process.env.REACT_APP_APP_ID;

interface Credentials {
    userId: string,
    token: string
}

interface ResponseFromApi {usersPortion: [], total: number}

export const sendCredentials = (login: string, password: string): AxiosPromise<Credentials> => axios.post(`${AUTH_URL}/sign-up`, {username: login, password: password});

export const signInToApi= (login: string, password: string): AxiosPromise<Credentials> => axios.post(`${AUTH_URL}/sign-in`, {username: login, password: password});

export const fetchDataFromApiAuth = (i: number, token: string): {}  =>
    axios.get(`${AUTH_URL}/user/?page=${i}&limit=${fetchingStep}`, { headers: { 'app-id': APP_ID, 'Authorization': `Bearer ${token}` } }).then(({data}) => {
        return {usersPortion: data.data, total: data.total};
    })