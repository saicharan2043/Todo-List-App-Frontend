import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import AllTodoDetails from "../Context/AllTodoDetails";
import "./index.css";

class AddTodoPopup extends Component {
  state = { title: "", description: "", category: "Work" };

  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  changeDesription = (e) => {
    this.setState({ description: e.target.value });
  };

  changeCantegroy = (e) => {
    this.setState({ category: e.target.value });
  };

  render() {
    const { title, description, category } = this.state;
    const { setNewTodoItem } = this.props;
    return (
      <AllTodoDetails.Consumer>
        {(value) => {
          const { addNewTodoItem } = value;

          const addNewItem = () => {
            const NewTodoDetails = {
              id: uuidv4(),
              title,
              description,
              category,
              status: false,
            };
            addNewTodoItem(NewTodoDetails);
            setNewTodoItem();
          };

          return (
            <div className="pop-up-bg-container">
              <div className="form-container">
                <div className="button-container">
                  <button className="cancel-btn" onClick={setNewTodoItem}>
                    Cancel
                  </button>
                  <button className="add-btn" onClick={addNewItem}>
                    Add
                  </button>
                </div>
                <label className="label">Title</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Add a title..."
                  value={title}
                  onChange={this.changeTitle}
                />
                <label className="label">Description</label>
                <textarea
                  cols={50}
                  rows={7}
                  className="text-area"
                  placeholder="Add a description"
                  value={description}
                  onChange={this.changeDesription}
                ></textarea>
                <label className="label">Categories</label>
                <select
                  className="input"
                  value={category}
                  onChange={this.changeCantegroy}
                >
                  <option className="" value="Work">
                    Work
                  </option>
                  <option className="" value="Study">
                    Study
                  </option>
                  <option className="" value="Entertainment">
                    Entertainment
                  </option>
                  <option className="" value="Family">
                    Family
                  </option>
                </select>
              </div>
            </div>
          );
        }}
      </AllTodoDetails.Consumer>
    );
  }
}

export default AddTodoPopup;
