/* eslint-disable react/prop-types */
import { Input, Form, Checkbox, Modal } from "antd";
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
    // values.name = values["full name"];
    // values.role = "patient";
    // delete values["full name"];
    // delete values["agreement"];
    // values.name = "dummy name";
    // values.email = values.email.trim();
    // values.password = values.password.trim();
    const response = await signup(
      values.username.trim(),
      values.password.trim(),
      values.email.trim(),
      values.firstname.trim(),
      values.lastname.trim()
    );
    if (response.status === 400) {
      // some error
      alert(response.data);
    }

    console.log("response is: ", response, "input: ", values);
    // console.log("token: ", response.tokens.access.token)
    setResponse(response.data);
    // if (response.status === 201 || response.status === 200) {
    //   Cookies.set("jwt_access_token", response.data.tokens.access.token, {
    //     expires: 7,
    //   });
    //   Cookies.set("jwt_refresh_token", response.data.tokens.refresh.token, {
    //     expires: 7,
    //   });
    //   setLoginStatus("loggedin");
    // } else {
    //   setLoginStatus("loginerror");
    // }
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
    return <Navigate replace to="/questionnaire" />;
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
