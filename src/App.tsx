import { Button, Flex, Grid, Heading, Spacer } from "@chakra-ui/react";
import { useAtom } from "jotai";
import AddNewUser from "./components/AddNewUser";
import CalculatePoints from "./components/CalculatePoints";
import DealerRow from "./components/DealerRow";
import PlayerRows from "./components/PlayerRows";
import ResetGameBtn from "./components/ResetGameBtn";
import { GAME_STATUS } from "./interfaces";
import { gameStatusAtom } from "./libs/atoms";

function App() {
  const [status, setStatus] = useAtom(gameStatusAtom);
  const isGameStart = status === GAME_STATUS.NOTSTART ? true : false

  const handleGameStart = () => {
    setStatus(GAME_STATUS.ONGOING);
  };

  return (
    <Flex flexDir="column" minH="100vh" px="2rem" pt="1rem">
      <Flex>
        <Heading>Blackjack Calculator</Heading>
        {
          !isGameStart && (
            <>
              <Spacer />
              <Flex gap='1rem'>
                <AddNewUser />
                <ResetGameBtn />
                <CalculatePoints />
              </Flex>
            </>
          )
        }
      </Flex>
      {isGameStart ? (
        <Flex justifyContent="center" alignItems="center" h="80vh">
          <Button onClick={handleGameStart}>Start new game</Button>
        </Flex>
      ) : (
        <Grid gridTemplateColumns="30% 70% " columnGap="2rem">
          <DealerRow />
          <PlayerRows />
        </Grid>
      )}
    </Flex>
  );
}

export default App;
