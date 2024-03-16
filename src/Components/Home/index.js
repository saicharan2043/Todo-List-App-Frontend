import { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import TodoListItem from "../TodoListItem";
import AddTodoPopup from "../AddTodoPopup";

import "./index.css";
import AllTodoDetails from "../Context/AllTodoDetails";

class Home extends Component {
  state = { isAddTrue: false };

  setNewTodoItem = () => {
    this.setState((privews) => ({ isAddTrue: !privews.isAddTrue }));
  };

  render() {
    const { isAddTrue } = this.state;
    return (
      <AllTodoDetails.Consumer>
        {(value) => {
          const { fliterTodoList } = value;
          return (
            <div className="bg-container">
              <Navbar setNewTodoItem={this.setNewTodoItem} />
              <div className="side-todo-conatiner">
                <Sidebar />
                {fliterTodoList.length !== 0 ? (
                  <ul className="ul-list-of-todo">
                    {fliterTodoList.map((eachValue) => (
                      <TodoListItem
                        eachTodoList={eachValue}
                        key={eachValue.id}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="no-result-container">
                    <h1 className="no-result-heading">Empty</h1>
                  </div>
                )}
              </div>
              {isAddTrue && (
                <AddTodoPopup setNewTodoItem={this.setNewTodoItem} />
              )}
            </div>
          );
        }}
      </AllTodoDetails.Consumer>
    );
  }
}

export default Home;
