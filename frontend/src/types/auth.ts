export type AUTH_LOGIN = {
    username: string;
    password: string
}

export type AUTH_LOGIN_RESPONSE = {
    username: string;
    expiresIn: string;
    accessToken: string;
}