const ROUTES = {
    signIn: '/sign-in',
    signUp: '/sign-up',
    dynamic: {
        user: (id = ':id') => `/users-page/${id}`,
    }
}

export default ROUTES;