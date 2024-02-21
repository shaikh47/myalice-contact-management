import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ContactList from "./components/contactList/ContactList";
import { signup, getLoggedInUserInfo } from "./apis/users";

const names = [
  "Syed Md Omar Shaikh",
  "Saifullah Saif",
  "Irafanul Islam",
  "Shafi Uddin Ahmed",
];

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // signup('shaikh234', 'asd', 'omar@gmail.com', 'omar', 'shaikh').then((res) => {
    //   console.log("response: ", res)
    // }).catch((err) => {
    //   console.log("Some error occured: ", err)
    // })

    getLoggedInUserInfo(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NTI0NTg3LCJpYXQiOjE3MDg1MjA5ODcsImp0aSI6IjU5OGVlOGE0MGQ0YTQzYzZiZTQxMmYwNmIxZmQ1NTVhIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJzaGFpa2gifQ.ycgn3MD4O5N0hNZUplC3gAQCAeL3pVM6J21Lf7mQR5Q"
    )
      .then((res) => {
        console.log("response: ", res);
      })
      .catch((err) => {
        console.log("Some error occured: ", err);
      });
  }, []);

  // return <Navigate replace to="/selection" />; 

  return (
    <>
      {names.map((name, index) => {
        return (
          <ContactList
            key={index}
            serial={index + 1}
            name={name}
            email={"omarshaikh47@gmail.com"}
            phone={"01923090558"}
            address={"Mirpur 11.5, pallabi"}
          />
        );
      })}
    </>
  );
}

export default App;
