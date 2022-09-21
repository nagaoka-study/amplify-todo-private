import { VStack } from "@chakra-ui/react";
import React from "react";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

const Main: React.VFC = () => {
  return (
    <VStack spacing={4} align="stretch" p={8}>
      <TodoList />
      <AddTodo />
    </VStack>
  );
};

export default Main;
