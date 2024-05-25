import {map} from "nanostores";
import {AUTH_STATUS} from "@/types/auth.ts";

export const commonStore = {
    user: map<AUTH_STATUS>(),

}