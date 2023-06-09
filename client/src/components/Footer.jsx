import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Items, chanceFilter, selectTodo } from "../redux/todoSlice/todoSlicer";

const Footer = () => {
  const items = useSelector(Items);
  const currentFilter = useSelector(selectTodo);
  const itemsLeft = items.filter((item) => !item.complated).length;
  const dispatch = useDispatch();
  return (
    <div className="w-full  border flex items-center justify-between text-neutral-700 ">
      <p className="px-2 py-3 font-medium text-lg">
        {itemsLeft > 1 ? `${itemsLeft} items` : `${itemsLeft} item`} left
      </p>
      <div className="flex items-center justify-center space-x-4 md:space-x-6">
        <button
          onClick={() => {
            dispatch(chanceFilter("all"));
          }}
          className={`px-2 py-2 active:outline active:outline-white rounded hover:bg-neutral-500 transition-all ease-in-out duration-500 ${
            currentFilter === "all" ? `border-2 border-neutral-700 ` : null
          } `}
        >
          All
        </button>
        <button
          onClick={() => {
            dispatch(chanceFilter("active"));
          }}
          className={`px-2 py-2 active:outline active:outline-white rounded hover:bg-neutral-500 transition-all ease-in-out duration-500 ${
            currentFilter === "active" ? `border-2 border-neutral-700 ` : null
          }`}
        >
          Active
        </button>
        <button
          onClick={() => {
            dispatch(chanceFilter("complated"));
          }}
          className={`px-2 py-2 active:outline active:outline-white rounded hover:bg-neutral-500 transition-all ease-in-out duration-500 ${
            currentFilter === "complated"
              ? `border-2 border-neutral-700 `
              : null
          }`}
        >
          Complated
        </button>
      </div>
      <button className="px-2 py-2 active:outline active:outline-white rounded hover:bg-neutral-500 transition-all ease-in-out duration-500">
        Clear Complated
      </button>
    </div>
  );
};

export default Footer;
