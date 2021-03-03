import {ReactNode} from "react";
import {signInRequest, signInFailed, signInSuccess, signUpRequest} from "../actions/sign-in-actions";
import rootReducer from "../reducers/root-reducer";
import signOutAction from "../actions/sign-out-action";
import {UserState} from "../support/axios";
// import {State} from "../store-sagas";

export type AddToast = (content: ReactNode, options: AddToastOptions) => string;
export type AddToastOptions = {
    appearance: string
}

export type UsersItem = {
    id: string,
    picture: string,
    lastName: string,
    email?: string,
    title: string,
    firstName: string,
    details?: UserState
}

export type StateUsers = UsersItem[];

export type UsersContainerProps = {
    users: StateUsers,
    id?: string,
    link: string,
    addToast: AddToast,
    key?: string
}

export type UserCardProps = {
    name: string,
    lastname: string,
    id: any,
    link?: string,
    addToast?: AddToast,
    key?: string,
    img: string,
    orderNumber: number
}

export type FieldValues = Record<string, any>;

// export type Field = {
//     ref: Ref;
//     mutationWatcher?: MutationWatcher;
//     options?: RadioOrCheckboxOption[];
// } & RegisterOptions;

export type UserInfoFormData = {
    age: number,
    dateOfBirth: Date,
    firstName: string,
    lastName: string,
    picture: string,
    title: string,
    id: string
}

export type NavBarProps = {
    pagesQuantity: number,
    linksGenerator: () => JSX.Element[]
}

// export type LinkRouterProps = {
//     color: string,
//     to: string,
//     key: string
// }

export type OnBoardingProps = {
    addToast: AddToast;
}

export type OnboardingFormData = {
    login: string,
    password: string
}

export type AuthActions = ReturnType<typeof signInRequest | typeof signUpRequest | typeof signInSuccess | typeof signInFailed | typeof signOutAction>;
export type StoreState = ReturnType<typeof rootReducer>;
export type AuthState = {
    loading: boolean,
    isLoggedIn: boolean,
    isAuthReady: boolean,
    token: null | string,
    error: null | Error,
};