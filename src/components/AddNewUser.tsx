import {
  Box,
  Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Tooltip, useDisclosure, VStack
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { RxPlus } from "react-icons/rx";
import * as yup from "yup";
import { PLAYER_ROLE, USER } from "../interfaces";
import { usersAtom } from "../libs/atoms";
import { isHasDealer } from "../utils";

export default function AddNewUser() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [users, setUsers] = useAtom(usersAtom);
  const formik = useFormik({
    initialValues: {
      name: "",
      bid: 0,
      role: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      bid: yup
        .number()
        .min(1, "Min value is 1")
        .max(99, "Max values is 99")
        .required("Bid is required"),
      role: yup
        .string()
        .oneOf(["dealer", "player"], "Role must be dealer or player")
        .required("Player role is required"),
    }),
    onSubmit: (values, actions) => {
      let checkDealer = false

      if (values.role === PLAYER_ROLE.DEALER) {
        checkDealer = isHasDealer(users)
      }

      if (!checkDealer) {
        const newId = crypto.randomUUID()

        const newUser: USER = {
          id: newId,
          name: values.name,
          bid: values.bid,
          role: values.role as PLAYER_ROLE,
          points: 0,
        };

        setUsers([...users, newUser]);

        actions.resetForm();
      } else {
        actions.setErrors({
          role: "Dealer has already added"
        })
      }
    },
  });


  return (
    <Box >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new player</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <VStack p="2rem">
              <FormControl isRequired isInvalid={Boolean(formik.errors.name)}>
                <Grid gridTemplateRows="repeat(3, 1fr)">
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="John Snow"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </Grid>
              </FormControl>
              <FormControl isRequired isInvalid={Boolean(formik.errors.bid)}>
                <Grid gridTemplateRows="repeat(3, 1fr)">
                  <FormLabel>Bid</FormLabel>
                  <Input name="bid" type="number" value={formik.values.bid} onChange={formik.handleChange} />
                  <FormErrorMessage>{formik.errors.bid}</FormErrorMessage>
                </Grid>
              </FormControl>
              <FormControl isRequired isInvalid={Boolean(formik.errors.role)}>
                <Grid gridTemplateRows="repeat(3, 1fr)">
                  <FormLabel>Player Role</FormLabel>
                  <Select
                    placeholder="Select role"
                    name="role"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                  >
                    <option value={PLAYER_ROLE.DEALER}>Dealer</option>
                    <option value={PLAYER_ROLE.PLAYER}>Player</option>
                  </Select>
                  <FormErrorMessage>{formik.errors.role}</FormErrorMessage>
                </Grid>
              </FormControl>
              <Button colorScheme="teal" leftIcon={<RxPlus />} type="submit">
                Add
              </Button>
            </VStack>
          </form>
        </ModalContent>
      </Modal>
      <Flex justifyContent="flex-end" mb="2rem">
        <Tooltip label="Add new user">
          <Button colorScheme="teal" onClick={onOpen}>
            <RxPlus />
          </Button>
        </Tooltip>
      </Flex>
    </Box>)
}
