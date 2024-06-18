import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import AllTodoDetails from "./Components/Context/AllTodoDetails";
import LoginAndCreateAccountPage from "./Components/LoginAndCreateAccountPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import Counter from "./Components/Counter";
import Cookies from "js-cookie";
import "./App.css";

class App extends Component {
  state = {
    AlltodoList: [],
    fliterTodoList: [],
    hideTask: false,
    category: "All",
  };

  componentDidMount() {
    this.getdata();
  }

  //https://backend-todo-app-terranxt-assignment.onrender.com
  getdata = async () => {
    const userId = Cookies.get("user_id");
    const response = await fetch(
      "https://todo-list-app-backend-4o34.onrender.com/getalldata",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      if (data.length !== 0) {
        const updateData = data.map((eachValue) => {
          if (eachValue.status === 0) {
            return { ...eachValue, status: false };
          }
          return { ...eachValue, status: true };
        });
        this.setState({ AlltodoList: updateData }, this.filterTheData);
      }
    }
  };

  filterTheData = () => {
    const { AlltodoList, hideTask, category } = this.state;
    if (category === "All") {
      const checkhideTask = hideTask
        ? AlltodoList.filter((eachValue) => eachValue.status === false)
        : AlltodoList;
      this.setState({ fliterTodoList: checkhideTask });
    } else {
      const categroyFilter = AlltodoList.filter(
        (eachValue) => eachValue.category === category
      );
      const checkhideTask = hideTask
        ? categroyFilter.filter((eachValue) => eachValue.status === false)
        : categroyFilter;
      this.setState({ fliterTodoList: checkhideTask });
    }
  };

  addNewTodoItem = async (newTodoItem) => {
    const userId = Cookies.get("user_id");
    const updatedtodoItem = { ...newTodoItem, user_id: userId };
    const response = await fetch(
      "https://todo-list-app-backend-4o34.onrender.com/addtodo",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedtodoItem),
      }
    );
    if (response.ok) {
      this.setState(
        (privews) => ({
          AlltodoList: [newTodoItem, ...privews.AlltodoList],
        }),
        this.filterTheData
      );
    }
  };

  hideTaskBtn = () => {
    this.setState(
      (privews) => ({ hideTask: !privews.hideTask }),
      this.filterTheData
    );
  };

  taskStatus = async (id) => {
    const { AlltodoList } = this.state;
    const updateData = AlltodoList.map((eachValue) => {
      if (eachValue.id === id) {
        return { ...eachValue, status: !eachValue.status };
      }
      return eachValue;
    });
    this.setState({ AlltodoList: updateData }, this.filterTheData);
    const userUpdate = updateData.filter((eachValue) => eachValue.id === id);
    await fetch(
      "https://todo-list-app-backend-4o34.onrender.com/updateischeck",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userUpdate[0] }),
      }
    );
  };

  updateTodoItem = async (updateIteam) => {
    const { AlltodoList } = this.state;
    const response = await fetch(
      "https://todo-list-app-backend-4o34.onrender.com/updatetodo",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateIteam),
      }
    );
    if (response.ok) {
      const updateData = AlltodoList.filter(
        (eachValue) => eachValue.id !== updateIteam.id
      );
      updateData.unshift(updateIteam);
      this.setState({ AlltodoList: updateData }, this.filterTheData);
    }
  };

  deleteTodoItem = async (id) => {
    const { AlltodoList } = this.state;
    const response = await fetch(
      "https://todo-list-app-backend-4o34.onrender.com/deletetodo",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );
    if (response.ok) {
      const updateData = AlltodoList.filter((eachValue) => eachValue.id !== id);
      this.setState({ AlltodoList: updateData }, this.filterTheData);
    }
  };

  changeCantegory = (newCantegory) => {
    this.setState({ category: newCantegory }, this.filterTheData);
  };

  LogoutBtn = () => {
    this.setState({
      AlltodoList: [],
      fliterTodoList: [],
      hideTask: false,
      category: "All",
    });
  };

  LoginBtn = () => {
    const uniqueId = setInterval(() => {
      const userId = Cookies.get("user_id");
      if (userId !== undefined) {
        this.getdata();
        clearInterval(uniqueId);
      }
    }, 500);
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
          LogoutBtn: this.LogoutBtn,
          LoginBtn: this.LoginBtn,
        }}
      >
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={LoginAndCreateAccountPage} />
          </Switch>
        </BrowserRouter>
      </AllTodoDetails.Provider>
    );
  }
}

export default App;
