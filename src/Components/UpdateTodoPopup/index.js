import { Component } from "react";
import AllTodoDetails from "../Context/AllTodoDetails";
import "../AddTodoPopup/index.css";

class AddTodoPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.updateItemData.title,
      description: props.updateItemData.description,
      category: props.updateItemData.category,
      id: props.updateItemData.id,
    };
  }

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
    const { title, description, category, id } = this.state;
    console.log(title);
    const { editExitingItem } = this.props;
    return (
      <AllTodoDetails.Consumer>
        {(value) => {
          const { updateTodoItem } = value;

          const updateItem = () => {
            const updatedvalue = {
              id,
              title,
              description,
              category,
              isCheckTrue: false,
            };
            updateTodoItem(updatedvalue);
            editExitingItem();
          };

          return (
            <div className="pop-up-bg-container">
              <div className="form-container">
                <div className="button-container">
                  <button
                    className="cancel-btn"
                    onClick={() => editExitingItem()}
                  >
                    Cancel
                  </button>
                  <button className="add-btn" onClick={updateItem}>
                    Edit
                  </button>
                </div>
                <label className="label">Title</label>
                <input
                  type="text"
                  className="input"
                  placeholder="add a title..."
                  value={title}
                  onChange={this.changeTitle}
                />
                <label className="label">Description</label>
                <textarea
                  cols={50}
                  rows={7}
                  className="text-area"
                  placeholder="add a description"
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
