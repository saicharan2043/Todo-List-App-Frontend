import React from "react";

const AllTodoDetails = React.createContext({
  addNewTodoItem: () => {},
  hideTaskBtn: () => {},
  taskStatus: () => {},
  updateTodoItem: () => {},
  deleteTodoItem: () => {},
  changeCantegory: () => {},
  AlltodoList: [],
  fliterTodoList: [],
  category: "Work",
});

export default AllTodoDetails;
