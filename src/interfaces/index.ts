export interface USER {
  id: string;
  name: string;
  bid: number;
  role: PLAYER_ROLE;
  status?: PLAYER_STATUS | string;
  points: number;
}

export enum GAME_STATUS {
  ONGOING = "on going",
  NOTSTART = "not start",
}

export enum PLAYER_ROLE {
  DEALER = "dealer",
  PLAYER = "player",
}

export enum PLAYER_STATUS {
  WON = "won",
  DRAW = "draw",
  LOSE = "lose",
}

export const RULE = {
  DRAW: 0,
  WIN: 0,
  LOSE: 0,
};
