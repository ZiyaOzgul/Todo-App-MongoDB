import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Items,
  deleteTodo,
  deleteTodoAsync,
  deleteTodosAsync,
  getTodosAsync,
  patchTodoAsync,
  // selectTodo,
  setComplated,
} from "../redux/todoSlice/todoSlicer";

const Body = () => {
  const todos = useSelector(Items);
  // const currentFilter = useSelector(selectTodo);
  const dispatch = useDispatch();
  // let filteredTodos = todos;
  const isLoading = useSelector((state) => state.todo.isLoading);
  // if (currentFilter !== "all") {
  //   currentFilter === "complated"
  //     ? (filteredTodos = todos.filter((item) => item.complated))
  //     : (filteredTodos = todos.filter((item) => !item.complated));
  // }
  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleToggle = async (id, complated) => {
    await dispatch(patchTodoAsync({ id, data: { complated } }));
  };
  // const handleDelete = async (id) => {
  //   await dispatch(deleteTodoAsync({ id }));
  // };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-4xl font-bold text-neutral-700">
        Loading...
      </div>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center justify-center border">
        {todos.map((item) => (
          <div
            key={item._id}
            className="w-full flex items-center justify-start space-x-4 md:space-x-12 border px-2 py-4 relative group "
          >
            <input
              type="checkbox"
              checked={item.complated}
              onChange={(e) => handleToggle(item._id, !item.complated)}
            />
            <p className="font-medium text-xl text-neutral-700">{item.title}</p>
            <span
              className="font-normal text-4xl absolute text-neutral-700 cursor-pointer  top-2 right-2 hidden group-hover:inline transition-all ease-in-out duration-500"
              onClick={() => dispatch(deleteTodoAsync({ id: item._id }))}
            >
              X
            </span>
          </div>
        ))}
      </div>
    );
  }
};

export default Body;
