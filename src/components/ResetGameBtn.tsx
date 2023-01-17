import type { ReactElement } from "react"
import { IconButton, Tooltip } from "@chakra-ui/react"
import { RxLoop } from "react-icons/rx"
import { useAtom } from "jotai"
import { usersAtom } from "../libs/atoms"

export default function ResetGameBtn(): ReactElement {
  const [, setUsers] = useAtom(usersAtom)

  return (
    <Tooltip label="Reset game">
      <IconButton aria-label="reset game" colorScheme="teal" onClick={() => setUsers([])}>
        <RxLoop />
      </IconButton>
    </Tooltip>
  )
}
