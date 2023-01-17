import {
  Box, Heading, Table, TableContainer, Tbody, Th, Thead, Tr
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { PLAYER_ROLE } from "../interfaces";
import { usersAtom } from "../libs/atoms";
import SinglePlayerRow from "./SinglePlayerRow";

export default function PlayerRows() {
  const [users] = useAtom(usersAtom);

  return (
    <Box>
      <Heading size="sm">Players</Heading>
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
              <Th isNumeric w="120px">
                Bid
              </Th>
              <Th w="220px">
                Round status
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.filter(i => i.role === PLAYER_ROLE.PLAYER).map((user) => (
              <SinglePlayerRow key={user.id} user={user} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
