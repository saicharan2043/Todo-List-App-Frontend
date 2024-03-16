import { IoMdAdd } from "react-icons/io";
import "./index.css";

const Navbar = (props) => {
  const { setNewTodoItem } = props;
  return (
    <nav className="nav-bar">
      <h1 className="logo-heading">Todo</h1>
      <IoMdAdd className="add-icon" onClick={setNewTodoItem} />
    </nav>
  );
};

export default Navbar;
