/* eslint-disable react/prop-types */
import { Input, Form, Checkbox, Modal, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signup } from "../../apis/users";

import "./Signup.css";

import { useState, useEffect } from "react";

const SignUp = ({ loginClick }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginStatus, setLoginStatus] = useState("loggedout");
  const [response, setResponse] = useState("");

  const onFinish = async (values) => {
    console.log(values);
    const response = await signup(
      values.username.trim(),
      values.password.trim(),
      values.email.trim(),
      values.firstname.trim(),
      values.lastname.trim()
    );

    if (response.status === 201) {
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
      setResponse(response.data);
    } else if (response.status === 400) {
      // some error
      message.error(response.data);
      setLoginStatus("loginerror");
    }

    console.log("response is: ", response, "input: ", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onFormChange = () => {
    setLoginStatus("loggedout");
  };

  if (loginStatus === "loggedin") {
    return <Navigate replace to="/contact" />;
  } else {
    return (
      <div className="signup-container">
        <h1 className="signup-header">Hi There!</h1>
        <p className="signup-paragraph">Welcome to Contact Management System</p>

        <Form
          name="basic"
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onChange={onFormChange}
          autoComplete="off"
        >
          <Form.Item
            status={loginStatus === "loginerror" ? "error" : ""}
            style={{ margin: "0" }}
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input commonStyles"
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item
            status={loginStatus === "loginerror" ? "error" : ""}
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
              className="input commonStyles"
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            status={loginStatus === "loginerror" ? "error" : ""}
            style={{ margin: "0" }}
            name="firstname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input commonStyles"
              placeholder="First name"
            />
          </Form.Item>

          <Form.Item
            status={loginStatus === "loginerror" ? "error" : ""}
            style={{ margin: "0" }}
            name="lastname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              status={loginStatus === "loginerror" ? "error" : ""}
              className="input commonStyles"
              placeholder="Last name"
            />
          </Form.Item>

          <Form.Item
            status={loginStatus === "loginerror" ? "error" : ""}
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
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined onClick={toggleVisibility} />
                ) : (
                  <EyeInvisibleOutlined onClick={toggleVisibility} />
                )
              }
            />
          </Form.Item>
          {loginStatus === "loginerror" ? (
            <p className="commonStyles invalidPrompt">{response}</p>
          ) : (
            ""
          )}
          <button className="signup-button commonStyles">Create Account</button>
        </Form>

        <p className="login-prompt commonStyles">
          Already have an account?{" "}
          <b>
            <a className="login-link" onClick={loginClick}>
              Login
            </a>
          </b>
        </p>
      </div>
    );
  }
};

export default SignUp;
