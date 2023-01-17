import { PLAYER_ROLE, PLAYER_STATUS, USER } from "../interfaces";

export function isHasDealer(users: USER[]) {
  if (users.length) {
    for (const i of users) {
      if (i.role === PLAYER_ROLE.DEALER) {
        return true
      }
    }
  }

  return false
}

export function validateBeforeCalculate(users: USER[]) {
  if (!users.length) {
    return false
  }

  for (const i of users) {
    if (i.role !== PLAYER_ROLE.DEALER && i.status !== PLAYER_STATUS.WON && i.status !== PLAYER_STATUS.DRAW && i.status !== PLAYER_STATUS.LOSE) {
      return false
    }
  }

  return true
}

export function calculatePoints(users: USER[]) {
  const dealer = users.filter(i => i.role === PLAYER_ROLE.DEALER)[0]
  const players = users.filter(i => i.role === PLAYER_ROLE.PLAYER)

  for (const i of players) {
    if (i.status === PLAYER_STATUS.WON) {
      dealer.points -= i.bid
      i.points += i.bid
    }

    if (i.status === PLAYER_STATUS.LOSE) {
      dealer.points += i.bid
      i.points -= i.bid
    }

    // Clear player status
    i.status = ""
  }

  return [dealer, ...players]
}
