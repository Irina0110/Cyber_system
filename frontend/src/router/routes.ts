export const routes = {
    auth: {
        login: '/login',
        signup: '/signUp',
        reset: '/reset'
    },
    player: {
        profile: '/player/profile/:playerId'
    },
    coach: {
        profile: '/coach/profile/:coachId',
    },
    teams: {
        all: '/teams',
        team: '/teams/:teamId',
        create: '/teams/create'
    },
    error: '/error',
    notFound: '*'
}