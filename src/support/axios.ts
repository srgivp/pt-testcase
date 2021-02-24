import axios, {AxiosPromise} from "axios";

//const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH_URL = process.env.REACT_APP_AUTH_URL;
//const APP_ID = process.env.REACT_APP_APP_ID;

interface Credentials {
    userId: string,
    token: string
}

export const sendCredentials = (login: string, password: string): AxiosPromise<Credentials> => axios.post(`${AUTH_URL}/sign-up`, {username: login, password: password});

export const signInToApi= (login: string, password: string) => axios.post<Credentials>(`${AUTH_URL}/sign-in`, {username: login, password: password});