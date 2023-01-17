import {
  Box, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import type { ReactElement } from "react";
import { PLAYER_ROLE } from "../interfaces";
import { usersAtom } from "../libs/atoms";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";


export default function DealerRow(): ReactElement {
  const [users] = useAtom(usersAtom);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <Box >
      <Heading size="sm">Dealer</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                Name
              </Th>
              <Th isNumeric>
                Remain Points
              </Th>
            </Tr>
          </Thead>
          <Tbody ref={parent}>
            {users.filter(i => i.role === PLAYER_ROLE.DEALER).map((user) => (
              <Tr key={user.id}>
                <Td>
                  <Text>{user.name}</Text>
                </Td>
                <Td isNumeric>
                  <Text>{user.points}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
