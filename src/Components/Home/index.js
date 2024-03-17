import { Component } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import TodoListItem from "../TodoListItem";
import AddTodoPopup from "../AddTodoPopup";
import UpdateTodoPopup from "../UpdateTodoPopup";

import "./index.css";
import AllTodoDetails from "../Context/AllTodoDetails";

class Home extends Component {
  state = { isAddTrue: false, isUpdateTrue: false, updateItemData: {} };

  setNewTodoItem = () => {
    this.setState((privews) => ({ isAddTrue: !privews.isAddTrue }));
  };

  editExitingItem = () => {
    this.setState((privews) => ({ isUpdateTrue: !privews.isUpdateTrue }));
  };

  clickUpdateBtn = (value) => {
    this.setState((privews) => ({
      isUpdateTrue: !privews.isUpdateTrue,
      updateItemData: value,
    }));
  };

  render() {
    const { isAddTrue, isUpdateTrue, updateItemData } = this.state;
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
                        clickUpdateBtn={this.clickUpdateBtn}
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
              {isUpdateTrue && (
                <UpdateTodoPopup
                  updateItemData={updateItemData}
                  editExitingItem={this.editExitingItem}
                />
              )}
            </div>
          );
        }}
      </AllTodoDetails.Consumer>
    );
  }
}

export default Home;
