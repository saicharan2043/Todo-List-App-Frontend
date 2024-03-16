import { Component } from "react";
import Home from "./Components/Home";
import AllTodoDetails from "./Components/Context/AllTodoDetails";
import "./App.css";

class App extends Component {
  state = {
    AlltodoList: [],
    fliterTodoList: [],
    hideTask: false,
    category: "All",
  };

  filterTheData = () => {
    const { AlltodoList, hideTask, category } = this.state;
    if (category === "All") {
      const checkhideTask = hideTask
        ? AlltodoList.filter((eachValue) => eachValue.isCheckTrue === false)
        : AlltodoList;
      this.setState({ fliterTodoList: checkhideTask });
    } else {
      const categroyFilter = AlltodoList.filter(
        (eachValue) => eachValue.category === category
      );
      const checkhideTask = hideTask
        ? categroyFilter.filter((eachValue) => eachValue.isCheckTrue === false)
        : categroyFilter;
      this.setState({ fliterTodoList: checkhideTask });
    }
  };

  addNewTodoItem = (newTodoItem) => {
    this.setState(
      (privews) => ({
        AlltodoList: [newTodoItem, ...privews.AlltodoList],
      }),
      this.filterTheData
    );
  };

  hideTaskBtn = () => {
    this.setState(
      (privews) => ({ hideTask: !privews.hideTask }),
      this.filterTheData
    );
  };

  taskStatus = (id) => {
    const { AlltodoList } = this.state;
    const updateData = AlltodoList.map((eachValue) => {
      if (eachValue.id === id) {
        return { ...eachValue, isCheckTrue: !eachValue.isCheckTrue };
      }
      return eachValue;
    });
    this.setState({ AlltodoList: updateData }, this.filterTheData);
  };

  updateTodoItem = (updateIteam) => {
    const { AlltodoList } = this.state;
    const updateData = AlltodoList.filter(
      (eachValue) => eachValue.id !== updateIteam.id
    );
    updateData.unshift(updateIteam);
    this.setState({ AlltodoList: updateData }, this.filterTheData);
  };

  deleteTodoItem = (id) => {
    const { AlltodoList } = this.state;
    const updateData = AlltodoList.filter((eachValue) => eachValue.id !== id);
    this.setState({ AlltodoList: updateData }, this.filterTheData);
  };

  changeCantegory = (newCantegory) => {
    this.setState({ category: newCantegory }, this.filterTheData);
  };

  render() {
    const { fliterTodoList, AlltodoList, category } = this.state;
    return (
      <AllTodoDetails.Provider
        value={{
          fliterTodoList,
          AlltodoList,
          category,
          addNewTodoItem: this.addNewTodoItem,
          hideTaskBtn: this.hideTaskBtn,
          taskStatus: this.taskStatus,
          updateTodoItem: this.updateTodoItem,
          deleteTodoItem: this.deleteTodoItem,
          changeCantegory: this.changeCantegory,
        }}
      >
        <Home />
      </AllTodoDetails.Provider>
    );
  }
}

export default App;
