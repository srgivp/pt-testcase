const ROUTES = {
    signIn: '/sign-in',
    signUp: '/sign-up',
    dynamic: {
        usersPage: (number: number | string = ':number') => `/users-page/${number}`,
        user: (number = ':number', id = ':id') => `/users-page/${number}/${id}`,
    }
}

export default ROUTES;