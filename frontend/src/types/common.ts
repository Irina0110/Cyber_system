export type API_RESPONSE<T> = {
    data: T;
    status: number;
    statusText: string;
};

export type JWT_PAYLOAD = {
    exp: number;
    iat: number;
    email: string;
    id: number;
    role: "PLAYER" | "COACH"
    username: string;
}