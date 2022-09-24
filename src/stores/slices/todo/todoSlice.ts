import { v4 as uuidv4 } from "uuid";
import {
  bindActionCreators,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../store";

export type TodoState = {
  todoList: { id: string; content: string; isDone: boolean }[];
};

const initialState: TodoState = {
  todoList: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    createTodo: (state, action) => {
      const newTodo = { id: uuidv4(), content: action.payload, isDone: false };
      state.todoList = [newTodo, ...state.todoList];
    },
    updateTodo: (state, action) => {
      //state.todoListの中から指定したidを持つtodoを抜き出す
      const todo = state.todoList.find((todo) => {
        return todo.id === action.payload;
      });
      //指定したidを持つtodoの完了状態を反転する
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
    deleteTodo: (state, action) => {
      //指定したidを持つtodo以外で新しいstate.todoListの配列を作成
      state.todoList = state.todoList.filter((todo) => {
        return todo.id !== action.payload;
      });
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, (state) => {
  //         state.status = "loading";
  //       })
  //       .addCase(incrementAsync.fulfilled, (state, action) => {
  //         state.status = "idle";
  //         state.value += action.payload;
  //       })
  //       .addCase(incrementAsync.rejected, (state) => {
  //         state.status = "failed";
  //       });
  //   },
});

export const { createTodo, updateTodo, deleteTodo } = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodoList = (state: RootState) => state.todo.todoList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default todoSlice.reducer;
