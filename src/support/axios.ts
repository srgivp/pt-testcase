import axios, {AxiosPromise} from "axios";
import {fetchingStep} from "../components/support/utils";
import {UsersItem} from "../types/ts-types";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
const APP_ID = process.env.REACT_APP_APP_ID;

interface Credentials {
    userId: string,
    token: string
}
interface FetchUsersResponse {
    usersPortion: UsersItem[],
    total: number
}

type Location = {
    street: string,
    city: string,
    state: string,
    country: string,
    timezone: string
}

export type FetchDetailsFromApi = {
    id: string,
    title: string,
    firstName: string,
    lastName: string,
    gender: string,
    email: string,
    dateOfBirth: string,
    registerDate: string,
    phone: string,
    picture: string,
    location: Location
}

export type UserState = FetchDetailsFromApi & {age?: number | number[]}

export const sendCredentials = (login: string, password: string): AxiosPromise<Credentials> => axios.post(`${AUTH_URL}/sign-up`, {username: login, password: password});

export const signInToApi= (login: string, password: string): AxiosPromise<Credentials> => axios.post(`${AUTH_URL}/sign-in`, {username: login, password: password});

export const fetchDataFromApiAuth = (i: number, token: string): Promise<FetchUsersResponse> =>
    axios.get(`${AUTH_URL}/user/?page=${i}&limit=${fetchingStep}`, { headers: { 'app-id': APP_ID, 'Authorization': `Bearer ${token}` } }).then(({data}) => {
        return {usersPortion: data.data, total: data.total};
    })

export const fetchDetailsFromApi = (id: string, token: string): Promise<FetchDetailsFromApi> =>
    axios.get(`${AUTH_URL}/user/${id}`, { headers: { 'app-id': APP_ID, 'Authorization': `Bearer ${token}` }} )
        .then(({data})=>{return data})