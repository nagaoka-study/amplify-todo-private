import React, { useEffect } from "react";
import {
  Center,
  Heading,
  VStack,
  StackDivider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import {
  selectTodoList,
  fetchTodoListAsync,
} from "../../stores/slices/todo/todoSlice";

import TodoItem from "./TodoItem";
import { DataStore } from "aws-amplify";
import { Todo } from "../../models";
import {
  fetchTodoRealTime,
  updateTodoRealTime,
  deleteTodoRealTime,
} from "../../stores/slices/todo/todoSlice";

const TodoList: React.VFC = () => {
  const todoList = useAppSelector(selectTodoList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    //todo一覧の取得
    const fetchTodoList = async () => {
      await dispatch(fetchTodoListAsync());
    };
    fetchTodoList();
  }, [dispatch]);

  useEffect(() => {
    //todoテーブルの変更をリアルタイムに検知する
    const subscription = DataStore.observe(Todo).subscribe((msg) => {
      console.log(msg);
      switch (msg.opType) {
        case "INSERT":
          dispatch(fetchTodoRealTime(msg.element));
          break;
        case "UPDATE":
          dispatch(updateTodoRealTime(msg.element));
          break;
        case "DELETE":
          dispatch(deleteTodoRealTime(msg.element));
          break;
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);
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
