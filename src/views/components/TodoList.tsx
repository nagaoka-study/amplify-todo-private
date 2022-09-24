import React from "react";
import {
  Center,
  Heading,
  VStack,
  StackDivider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useAppSelector } from "../../stores/hooks";
import { selectTodoList } from "../../stores/slices/todo/todoSlice";

import TodoItem from "./TodoItem";

const TodoList: React.VFC = () => {
  const todoList = useAppSelector(selectTodoList);
  return (
    <Flex flexDir="column" align="center">
      <Center mb={8}>
        <Heading>Todo List</Heading>
      </Center>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
        w={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw" }}
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
        p={4}
        maxH="35vh"
        overflow="scroll"
      >
        {todoList.length === 0 ? (
          <Text>No Todo</Text>
        ) : (
          todoList.map((item: any) => {
            return (
              <TodoItem
                key={item.id}
                id={item.id}
                content={item.content}
                isDone={item.isDone}
              />
            );
          })
        )}
      </VStack>
    </Flex>
  );
};

export default TodoList;
