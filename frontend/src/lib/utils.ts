import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isTokenExpired = (date: number) => {
    const expires = new Date(0);
    expires.setUTCSeconds(date);
    return Date.now() >= expires.getTime()
}