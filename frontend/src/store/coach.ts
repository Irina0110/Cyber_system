import {COACH_PROFILE} from "@/types/coach.ts";
import {map} from "nanostores";

export const coachStore = {
    profile: map<COACH_PROFILE>()
}