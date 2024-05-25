import {map} from "nanostores";
import {PLAYER_PROFILE} from "@/types/player.ts";

export const playerStore = {
    profile: map<PLAYER_PROFILE>()
}