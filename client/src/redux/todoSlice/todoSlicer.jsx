import {
  createAsyncThunk,
  createSerializableStateInvariantMiddleware,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "/todos/getTodosAsync",
  async () => {
    const res = await axios.get("http://localhost:3001/todos");
    return await res.data;
  }
);

export const postTodoAsync = createAsyncThunk(
  "/todos/postTodoAsync",
  async (postData) => {
    const res = await axios.post("http://localhost:3001/todos", postData);
    return res.data;
  }
);
// export const patchTodoAsync = createAsyncThunk(
//   "/todo/patchTodoAsync",
//   async ({ id, data }) => {
//     const res = await axios.patch(`http/localhost:3001/todos/${id}`, data);
//     return res.data;
//   }
// );
export const patchTodoAsync = createAsyncThunk(
  "/todos/patchTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(`http://localhost:3001/todos/${id}`, data);
    return res.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "/todos/deleteTodoAsync",
  async ({ id }) => {
    const res = await axios.delete(`http://localhost:3001/todos/${id}`);
    return await res.data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [],
    filter: "all",
    isLoading: false,
    error: null,
  },
  extraReducers: {
    //get
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //post
    [postTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [postTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [postTodoAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      console.log(state.error);
      state.isLoading = false;
    },
    //patch
    [patchTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [patchTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [patchTodoAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      console.log(state.error);
      state.isLoading = false;
    },
    //del
    [deleteTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [deleteTodoAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
  reducers: {
    // addTodo: (state, action) => {
    //   state.items.push({
    //     id: state.items.length + 1,
    //     title: action.payload,
    //     complated: false,
    //   });
    // },
    // setComplated: (state, action) => {
    //   state.items[action.payload.id - 1].complated = action.payload.isComplated;
    //   state.items.map((item) =>
    //     item.id === action.payload.id
    //       ? (item.complated = action.payload.isComplated)
    //       : null
    //   );
    // },
    // deleteTodo: (state, action) => {
    //   let newitems = state.items.filter((item) => item.id !== action.payload);
    //   state.items = newitems;
    // },
    chanceFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const selectTodo = (state) => state.todo.filter;
export const Items = (state) => {
  if (state.todo.filter !== "all") {
    return state.todo.items.filter((item) =>
      state.todo.filter === "active" ? !item.complated : item.complated
    );
  } else return state.todo.items;
};

export const { addTodo, setComplated, deleteTodo, chanceFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
