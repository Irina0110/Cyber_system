export const routes = {
    main: '/',
    auth: {
        login: '/login',
        signup: '/signUp',
        reset: '/reset'
    },
    player: {
        profile: '/player/profile/:playerId'
    },
    teams: {
        all: '/teams',
        team: '/teams/:teamId'
    },
    error: '/error',
    notFound: '*'
}