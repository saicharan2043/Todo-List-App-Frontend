import { IoMdAdd } from "react-icons/io";
import "./index.css";

const Navbar = (props) => {
  const { setNewTodoItem } = props;
  return (
    <nav className="nav-bar">
      <img
        src="https://media.licdn.com/dms/image/D560BAQHBSZ1Apw7WrQ/company-logo_200_200/0/1707289640489/shanture_logo?e=1726704000&v=beta&t=FEAInODrJH79ZSIhA3DL-xVmZQ8K12fh8wxEzo9b1x8"
        className="logo"
        alt="logo"
      />
      <IoMdAdd className="add-icon" onClick={setNewTodoItem} />
    </nav>
  );
};

export default Navbar;
