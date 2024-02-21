import { useState, useEffect } from "react";
import "./login.css";
import { Link, Navigate } from "react-router-dom";
import { Input, Form } from "antd";
import { login } from "../../apis/users";
import Cookies from "js-cookie";

const Login = ({ signUpClick }) => {
  const [loginStatus, setLoginStatus] = useState("loggedout"); //three states, 1. loggedout, 2. loggedin, 3. loginerror, 4.phq
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = async (values) => {
    const response = await login(
      values.username.trim(),
      values.password.trim()
    );

    console.log("INput values and res: ", values, response);

    if (response === "error") {
      // possible cert error
      setIsModalOpen(true);
    }

    if (response.status === 200) {
      Cookies.set(
        "contact",
        JSON.stringify({
          accessToken: response.data.token,
          email: response.data.user.email,
          id: response.data.user.id,
          firstName: response.data.user.first_name,
          lastName: response.data.user.last_name,
          username: response.data.user.username,
        }),
        {
          expires: 7,
        }
      );
      setLoginStatus("loggedin");
    } else {
      setLoginStatus("loginerror");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFormChange = () => {
    setLoginStatus("loggedout");
  };

  if (loginStatus === "loggedin") {
    return <Navigate replace to="/contact" />;
  } else {
    return (
      <div className="login-container">
        <h1 className="login-header">Hi There!</h1>
        <p className="login-paragraph">Welcome to Contact Management System</p>
        <Form
          name="basic"
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onChange={onFormChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ margin: "0" }}
            name="username"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              // onChange={handleEmailChange}
              className="input commonStyles"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            style={{ margin: "0" }}
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input commonStyles"
              placeholder="Password"
            />
          </Form.Item>

          {loginStatus === "loginerror" ? (
            <p className="commonStyles invalidPrompt">Invalid Credentials</p>
          ) : (
            ""
          )}

          <button className="login-button commonStyles">Login</button>
        </Form>

        <p className="sign-up-prompt commonStyles">
          Don’t have an account?{" "}
          <b>
            <a className={"signup-link"} onClick={signUpClick}>
              Sign up
            </a>
          </b>
        </p>
      </div>
    );
  }
};

export default Login;

// return <div className="container"> <Link to="/contact"}>About</Link></div>;
