import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { ReactElement } from "react";
import { usersAtom, isAllUsersValidAtom } from "../libs/atoms";
import { calculatePoints } from "../utils";

export default function CalculatePoints(): ReactElement {
  const [users, setUsers] = useAtom(usersAtom)
  const [valid] = useAtom(isAllUsersValidAtom)

  const handleCalculatePoints = () => {
    const newUsers = calculatePoints(users)
    setUsers(newUsers)
  }

  return (
    <Button colorScheme="teal" isDisabled={!valid} onClick={handleCalculatePoints}>
      Calculate points
    </Button>
  )
}
