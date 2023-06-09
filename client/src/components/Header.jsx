import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTodoAsync } from "../redux/todoSlice/todoSlicer";

const Header = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleKeydown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await dispatch(postTodoAsync({ title }));
      setTitle("");
    }
  };
  return (
    <div className="w-full flex items-center justify-center flex-col space-y-4 md:space-y-12">
      <h1 className="font-bold text-4xl md:text-6xl text-neutral-700">to Do</h1>
      <input
        type="text"
        placeholder="Enter Todo..."
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={handleKeydown}
        className="font-medium border px-4 py-3 otuline-none  w-full focus:outline-none text-xl "
      />
    </div>
  );
};

export default Header;
