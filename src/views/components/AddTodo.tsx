import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { createTodoApi } from "../../stores/slices/todo/todoAPI";

const AddTodo: React.VFC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const onSubmit = async (data: { content: string }) => {
    await createTodoApi(data);
    reset();
  };
  return (
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={errors.content}
          w={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw" }}
        >
          <Input
            id="content"
            placeholder="Enter todo"
            {...register("content", { required: "Please enter todo." })}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
        <Box w="100%" display="flex" justifyContent="flex-end">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTodo;
