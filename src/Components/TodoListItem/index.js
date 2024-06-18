import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { VscExpandAll } from "react-icons/vsc";
import { MdOutlineWork } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaMasksTheater } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import "./index.css";
import "../Sidebar/index.css";
import AllTodoDetails from "../Context/AllTodoDetails";

const TodoListItem = (props) => {
  const [isDeleteEditPopTrue, setIsDeleteEditPopTrue] = useState(false);
  const { eachTodoList, clickUpdateBtn } = props;
  const { title, description, category, status, id } = eachTodoList;

  const showUpdateAndDeletePopup = (deleteTodoItem) => {
    return (
      <div className="delete-edit-container">
        <button
          className="button-edit"
          onClick={() => {
            clickUpdateBtn(eachTodoList);
            setIsDeleteEditPopTrue((prev) => !prev);
          }}
        >
          Edit..
        </button>
        <hr className="hr" />
        <button
          className="button-edit"
          onClick={() => {
            deleteTodoItem(id);
            setIsDeleteEditPopTrue((prev) => !prev);
          }}
        >
          Delete
        </button>
      </div>
    );
  };

  const getReleatedIcons = (category) => {
    switch (category) {
      case "All":
        return <VscExpandAll className="icon-of-tab" />;
        break;
      case "Work":
        return <MdOutlineWork className="icon-of-tab" />;
        break;
      case "Study":
        return <PiStudentBold className="icon-of-tab" />;
        break;
      case "Entertainment":
        return <FaMasksTheater className="icon-of-tab" />;
        break;
      default:
        return <MdOutlineFamilyRestroom className="icon-of-tab" />;
        break;
    }
  };

  const clickTreeDots = () => {
    setIsDeleteEditPopTrue(!isDeleteEditPopTrue);
  };

  return (
    <AllTodoDetails.Consumer>
      {(value) => {
        const { taskStatus, deleteTodoItem } = value;
        const ClickCompelte = () => {
          taskStatus(id);
        };
        return (
          <li className="list-of-todo">
            <div className="container-of-heading">
              <h1 className={`title-of-todo ${status && "hr-line"}`}>
                {title}
              </h1>
              <BsThreeDots className="three-dots" onClick={clickTreeDots} />
            </div>
            <p className={`description ${status && "hr-line"}`}>
              {description}
            </p>
            <div className="bottom-container">
              <div className="horizontal-container">
                {getReleatedIcons(category)}
                <p className="title-of-tab">{category}</p>
              </div>
              <div className="horizontal-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="done"
                  onChange={ClickCompelte}
                  checked={status}
                />
                <label htmlFor="done" className="label-of-checkbox">
                  Done
                </label>
              </div>
            </div>
            {isDeleteEditPopTrue && showUpdateAndDeletePopup(deleteTodoItem)}
          </li>
        );
      }}
    </AllTodoDetails.Consumer>
  );
};

export default TodoListItem;
