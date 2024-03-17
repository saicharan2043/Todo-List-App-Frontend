import { Component } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import Cookies from "js-cookie";
import "./index.css";

class CreateAccount extends Component {
  state = { name: "", username: "", password: "", errorMsg: "" };

  changeName = (event) => {
    this.setState({ name: event.target.value, errorMsg: "" });
  };

  changeUserName = (event) => {
    this.setState({ username: event.target.value, errorMsg: "" });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value, errorMsg: "" });
  };

  sendUserDetails = async () => {
    const { name, username, password } = this.state;
    const details = {
      name,
      username,
      password,
    };

    const response = await fetch("http://localhost:5000/register", {
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

  clickCreate = () => {
    const { name, username, password } = this.state;
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name !== "" && password !== "" && username.match(validRegex)) {
      this.sendUserDetails();
    } else {
      this.setState({ errorMsg: "Enter vaild details" });
    }
  };

  render() {
    const { clickSwitchBtn } = this.props;
    const { name, username, password, errorMsg } = this.state;
    return (
      <div className="bg-container-create-account">
        <HiMiniRocketLaunch className="rocket-logo-of-create-account" />
        <h1 className="heading-of-create-account">Create Your Accont</h1>
        <input
          className="input-feild"
          placeholder="Enter Your Name"
          onChange={this.changeName}
          value={name}
        />
        <input
          className="input-feild"
          placeholder="Enter Email ID"
          onChange={this.changeUserName}
          value={username}
        />
        <input
          className="input-feild"
          placeholder="Enter Password"
          onChange={this.changePassword}
          value={password}
        />
        <button className="btn-of-create-account" onClick={this.clickCreate}>
          <p className="btn-title-of-create-account">Continue</p>
          <FaArrowRight className="arrow-of-btn-create-accounts" />
        </button>
        <p className="eror-msg">{errorMsg}</p>
        <p className="note-text">
          Already have account?{" "}
          <span className="note-btn" onClick={clickSwitchBtn}>
            Login
          </span>
        </p>
      </div>
    );
  }
}

export default withRouter(CreateAccount);
