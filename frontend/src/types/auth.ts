export type AUTH_LOGIN = {
    username: string;
    password: string
}

export type AUTH_LOGIN_RESPONSE = {
    username: string;
    expiresIn: string;
    accessToken: string;
}

export type AUTH_SIGN_UP = AUTH_LOGIN & {
    email: string
    role: string
}

export type AUTH_SIGN_UP_RESPONSE = {
    success: boolean;
    message: string;
}