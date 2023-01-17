import {
  IconButton, Menu,
  MenuButton,
  MenuItem,
  MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Td, Text, Tr
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ChangeEvent, ReactElement, useState } from "react";
import { RxPencil1 } from "react-icons/rx";
import { PLAYER_ROLE, PLAYER_STATUS, USER } from "../interfaces";
import { isAllUsersValidAtom, usersAtom } from "../libs/atoms";
import { useEffect } from "react"

export default function SinglePlayerRow({ user }: { user: USER }): ReactElement {
  const [users, setUsers] = useAtom(usersAtom);
  const [isValid] = useAtom(isAllUsersValidAtom)
  const [currentBid, setCurrentBid] = useState<number>(user.bid)
  const [currentStatus, setCurrentStatus] = useState<string>(user.status ?? "")

  // Reset selection fields
  useEffect(() => {
    if (!isValid) {
      setCurrentStatus("")
    }
  }, [isValid])

  const handleChangeToDealer = (id: string) => {
    const newUsers = [...users]
    const dealerIdx = newUsers.findIndex(i => i.role === PLAYER_ROLE.DEALER)

    if (dealerIdx !== -1) {
      newUsers[dealerIdx].role = PLAYER_ROLE.PLAYER
    }

    const newDealerIdx = newUsers.findIndex(i => i.id === id)

    if (newDealerIdx !== -1) {
      newUsers[newDealerIdx].role = PLAYER_ROLE.DEALER
      setUsers(newUsers)
    }
  }

  const handleRemoveUser = (id: string) => {
    const newUsers = users.filter(i => i.id !== id)
    setUsers(newUsers)
  }

  const handleChangeBid = (value: string) => {
    const n = Number(value)
    setCurrentBid(n)

    const newUsers = [...users]
    const foundIdx = newUsers.findIndex(i => i.id === user.id)
    newUsers[foundIdx].bid = n
    setUsers(newUsers)
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCurrentStatus(value)

    const newUsers = [...users]
    const foundIdx = newUsers.findIndex(i => i.id === user.id)
    newUsers[foundIdx].status = value as PLAYER_STATUS
    setUsers(newUsers)
  }

  return (
    <Tr>
      <Td>
        <Text>{user.name}</Text>
      </Td>
      <Td isNumeric>
        <Text>{user.points}</Text>
      </Td>
      <Td>
        <NumberInput max={99} min={1} value={currentBid} onChange={value => handleChangeBid(value)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Td>
      <Td>
        <Select
          placeholder="Select round status"
          name="status"
          value={currentStatus}
          onChange={handleChangeStatus}
        >
          <option value={PLAYER_STATUS.WON}>Won</option>
          <option value={PLAYER_STATUS.DRAW}>Draw</option>
          <option value={PLAYER_STATUS.LOSE}>Lose</option>
        </Select>
      </Td>
      <Td>
        <Menu>
          <MenuButton as={IconButton} icon={
            <RxPencil1 />
          }>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleChangeToDealer(user.id)}>Change to Dealer</MenuItem>
            <MenuItem onClick={() => handleRemoveUser(user.id)}>Remove user</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  )
}
