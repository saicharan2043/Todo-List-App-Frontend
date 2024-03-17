import { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import Cookies from "js-cookie";
import "../CreateAccount/index.css";

class Login extends Component {
  state = { username: "", password: "", errorMsg: "" };

  changeMail = (e) => {
    this.setState({ username: e.target.value, errorMsg: "" });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value, errorMsg: "" });
  };

  checkUserDetails = async () => {
    const { username, password } = this.state;
    const details = {
      username,
      password,
    };

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      Cookies.set("user_id", JSON.stringify(data.id));
      const { history } = this.props;
      history.replace("/home");
    } else {
      this.setState({ errorMsg: data.error_msg });
    }
  };

  clickLogin = () => {
    const { username, password } = this.state;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (password !== "" && username.match(validRegex)) {
      this.checkUserDetails();
    } else {
      this.setState({ errorMsg: "Enter vaild details" });
    }
  };

  render() {
    const { clickSwitchBtn } = this.props;
    const { username, password, errorMsg } = this.state;
    return (
      <div className="bg-container-create-account">
        <HiMiniRocketLaunch className="rocket-logo-of-create-account" />
        <h1 className="heading-of-create-account">Login Your Accont</h1>
        <input
          className="input-feild"
          placeholder="Enter Email ID"
          onChange={this.changeMail}
          value={username}
        />
        <input
          className="input-feild"
          placeholder="Enter Password"
          onChange={this.changePassword}
          value={password}
        />
        <button className="btn-of-create-account" onClick={this.clickLogin}>
          <p className="btn-title-of-create-account">Login</p>
          <FaArrowRight className="arrow-of-btn-create-accounts" />
        </button>
        <p className="eror-msg">{errorMsg}</p>
        <p className="note-text">
          Don't have account?{" "}
          <span className="note-btn" onClick={clickSwitchBtn}>
            Create
          </span>
        </p>
      </div>
    );
  }
}

export default withRouter(Login);
