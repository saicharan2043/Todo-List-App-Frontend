import { Component } from "react";
import { Redirect } from "react-router-dom";
import CreateAccount from "../CreateAccount";
import Login from "../Login";
import "./index.css";
import "../Navbar/index.css";
import Cookies from "js-cookie";

class LoginAndCreateAccountPage extends Component {
  state = { isLoginTrue: false };

  clickSwitchBtn = () => {
    this.setState((previws) => ({ isLoginTrue: !previws.isLoginTrue }));
  };

  render() {
    const { isLoginTrue } = this.state;
    const token = Cookies.get("user_id");
    if (token !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <div className="login-page-nav">
          <img
            src="https://media.licdn.com/dms/image/D560BAQHBSZ1Apw7WrQ/company-logo_200_200/0/1707289640489/shanture_logo?e=1726704000&v=beta&t=FEAInODrJH79ZSIhA3DL-xVmZQ8K12fh8wxEzo9b1x8"
            className="logo"
            alt="logo"
          />
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
