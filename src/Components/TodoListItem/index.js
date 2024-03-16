import { BsThreeDots } from "react-icons/bs";
import { FaMasksTheater } from "react-icons/fa6";
import "./index.css";
import "../Sidebar/index.css";
import AllTodoDetails from "../Context/AllTodoDetails";

const TodoListItem = (props) => {
  const { eachTodoList } = props;
  const { title, description, category, isCheckTrue, id } = eachTodoList;
  console.log(isCheckTrue);
  return (
    <AllTodoDetails.Consumer>
      {(value) => {
        const { taskStatus } = value;
        const ClickCompelte = () => {
          taskStatus(id);
        };
        return (
          <li className="list-of-todo">
            <div className="container-of-heading">
              <h1 className={`title-of-todo ${isCheckTrue && "hr-line"}`}>
                {title}
              </h1>
              <BsThreeDots className="three-dots" />
            </div>
            <p className={`description ${isCheckTrue && "hr-line"}`}>
              {description}
            </p>
            <div className="bottom-container">
              <div className="horizontal-container">
                <FaMasksTheater className="icon-of-tab" />
                <p className="title-of-tab">{category}</p>
              </div>
              <div className="horizontal-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="done"
                  onChange={ClickCompelte}
                  checked={isCheckTrue}
                />
                <label htmlFor="done" className="label-of-checkbox">
                  Done
                </label>
              </div>
            </div>
          </li>
        );
      }}
    </AllTodoDetails.Consumer>
  );
};

export default TodoListItem;
