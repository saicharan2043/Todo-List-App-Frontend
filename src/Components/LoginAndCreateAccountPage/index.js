import { Component } from "react";

import CreateAccount from "../CreateAccount";
import Login from "../Login";
import NavBar from "../Navbar";
import "./index.css";
import "../Navbar/index.css";

class LoginAndCreateAccountPage extends Component {
  state = { isLoginTrue: false };

  clickSwitchBtn = () => {
    this.setState((previws) => ({ isLoginTrue: !previws.isLoginTrue }));
  };

  render() {
    const { isLoginTrue } = this.state;
    return (
      <>
        <div className="nav-bar">
          <h1 className="logo-heading">Todo</h1>
        </div>
        <div className="bg-container-LoginAndCreateAccountPage">
          {isLoginTrue ? (
            <Login clickSwitchBtn={this.clickSwitchBtn} />
          ) : (
            <CreateAccount clickSwitchBtn={this.clickSwitchBtn} />
          )}
        </div>
      </>
    );
  }
}

export default LoginAndCreateAccountPage;
