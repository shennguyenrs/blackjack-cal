import { atom } from "jotai";
import { GAME_STATUS, USER } from "../interfaces";
import { validateBeforeCalculate } from "../utils";

export const usersAtom = atom<USER[]>([]);
export const gameStatusAtom = atom<GAME_STATUS>(GAME_STATUS.NOTSTART);
export const isAllUsersValidAtom = atom(get => validateBeforeCalculate(get(usersAtom)))
