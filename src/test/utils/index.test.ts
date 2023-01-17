import { describe, assert, it } from "vitest"
import { PLAYER_ROLE, USER } from "../../interfaces"
import { isHasDealer, validateBeforeCalculate, calculatePoints } from "../../utils"

describe("test isHasDealer", () => {
  it("should return true", () => {
    const users: USER[] = [
      {
        id: "1",
        name: "tester 1",
        role: "dealer" as PLAYER_ROLE,
        bid: 1,
        points: 0
      },
      {
        id: "2",
        name: "tester 2",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0
      }
    ]

    assert.equal(isHasDealer(users), true)
  })

  it("should return false", () => {
    assert.equal(isHasDealer([]), false)

    const users: USER[] = [
      {
        id: "1",
        name: "tester 1",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0
      },
      {
        id: "2",
        name: "tester 2",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0
      }
    ]

    assert.equal(isHasDealer(users), false)
  })
})

describe("test validateBeforeCalculate", () => {
  it("should return true", () => {
    const users: USER[] = [
      {
        id: "1",
        name: "tester 1",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0,
        status: "won"
      },
      {
        id: "2",
        name: "tester 2",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0,
        status: "won"
      }
    ]
    assert.equal(validateBeforeCalculate(users), true)

    users[0].status = "lose"
    users[1].status = "won"
    assert.equal(validateBeforeCalculate(users), true)

    users[0].status = "draw"
    users[1].status = "won"
    assert.equal(validateBeforeCalculate(users), true)
  })

  it("shoudl return false", () => {
    assert.equal(validateBeforeCalculate([]), false)

    const users: USER[] = [
      {
        id: "1",
        name: "tester 1",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0,
      },
      {
        id: "2",
        name: "tester 2",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0,
      }
    ]
    assert.equal(validateBeforeCalculate(users), false)

    users[1].status = "lose"
    assert.equal(validateBeforeCalculate(users), false)

    users[0].status = ""
    users[1].status = ""
    assert.equal(validateBeforeCalculate(users), false)

    users[0].status = "wi"
    users[1].status = "lose"
    assert.equal(validateBeforeCalculate(users), false)
  })
})

describe("test calulatePoints", () => {
  it("should return correctly calculation", () => {
    const players: USER[] = [
      {
        id: "1",
        name: "tester 1",
        role: "player" as PLAYER_ROLE,
        bid: 3,
        points: 0,
        status: "won"
      },
      {
        id: "2",
        name: "tester 2",
        role: "player" as PLAYER_ROLE,
        bid: 1,
        points: 0,
        status: "lose"
      }
    ]
    const dealer: USER = {
      id: "2",
      name: "tester 3",
      role: "dealer" as PLAYER_ROLE,
      bid: 4,
      points: 0,
    }

    let result = calculatePoints([dealer, ...players])
    assert.equal(result[0].points, -2)
    assert.equal(result[1].points, 3)
    assert.equal(result[2].points, -1)
    assert.equal(result[1].status, "")
    assert.equal(result[2].status, "")

    players[0].bid = 4
    players[1].bid = 4
    players[0].status = "won"
    players[1].status = "won"
    result = calculatePoints([dealer, ...players])
    assert.equal(result[0].points, -10)
    assert.equal(result[1].points, 7)
    assert.equal(result[2].points, 3)
    assert.equal(result[1].status, "")
    assert.equal(result[2].status, "")

    players[0].bid = 8
    players[1].bid = 6
    players[0].status = "lose"
    players[1].status = "draw"
    result = calculatePoints([dealer, ...players])
    assert.equal(result[0].points, -2)
    assert.equal(result[1].points, -1)
    assert.equal(result[2].points, 3)
    assert.equal(result[1].status, "")
    assert.equal(result[2].status, "")
  })
})
