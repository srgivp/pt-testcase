import {ReactNode} from "react";
import {signInRequest, signInFailed, signInSuccess, signUpRequest} from "../actions/sign-in-actions";
import rootReducer from "../reducers/root-reducer";
import signOutAction from "../actions/sign-out-action";

export type AddToast = (content: ReactNode, options: AddToastOptions) => string;
export type AddToastOptions = {
    appearance: string
}

export type State = {
    users: StateUsers,
    user: StateUser,
    loading: boolean,
    token: string

}

// export type StateSignedUp = StateSignedIn[];

export type UsersItem = {
    id: string,
    picture: string,
    lastName: string,
    email?: string,
    title: string,
    firstName: string,
    details: StateUser
}

export type StateUsers = UsersItem[];


export type StateUser = {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    age: number,
    gender?: string,
    picture: string,
    route?: string,
    title?: string
}

// export type StateSignedIn = {
//     login: string,
//     password: string,
//     userId: string,
//     token: string
// }

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
    id: string,
    link: string,
    addToast: AddToast,
    key?: string,
    img: string
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

export type LinkRouterProps = {
    color: string,
    to: string,
    key: string
}

export type OnBoardingProps = {
    addToast: AddToast;
}

export type OnboardingFormData = {
    login: string,
    password: string
}

export type InitFetchAuthData = {
    token: string,
    addToast: AddToast
}

export type InitFetchAuthAction = {
    type: string,
    data: InitFetchAuthData
}

export type DisplayUserSagaData = {
    token: string,
    addToast: AddToast,
    id: string,
    link: string
}

export type DisplayUserSagaAction = {
    type: string,
    data: DisplayUserSagaData
}

export type OnboardingSagaData = {
    state: State,
    addToast: AddToast,
    data: LoginPassword
}

export type OnboardingSagaAction = {
    type: string,
    data: OnboardingSagaData
}

export type LoginPassword = {
    login: string,
    password: string
}

export type SignToApiResponseData = {
    userId: string,
    token: string
}

export type SignToApiResponse = {
    data: SignToApiResponseData
}

export type UsersReducerActionData = [] | StateUsers | StateUser | UserInfoFormData;

export type AuthActions = ReturnType<typeof signInRequest | typeof signUpRequest| typeof signInSuccess | typeof signInFailed | typeof signOutAction>;
export type StoreState = ReturnType<typeof rootReducer>;