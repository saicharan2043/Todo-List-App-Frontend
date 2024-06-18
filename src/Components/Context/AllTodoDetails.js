import React from "react";

const AllTodoDetails = React.createContext({
  addNewTodoItem: () => {},
  hideTaskBtn: () => {},
  taskStatus: () => {},
  updateTodoItem: () => {},
  deleteTodoItem: () => {},
  changeCantegory: () => {},
  LoginBtn: () => {},
  LogoutBtn: () => {},
  AlltodoList: [],
  fliterTodoList: [],
  category: "All",
});

export default AllTodoDetails;
