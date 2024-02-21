import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import ContactList from "./components/contactList/ContactList";

const names = [
  "Syed Md Omar Shaikh",
  "Saifullah Saif",
  "Irafanul Islam",
  "Shafi Uddin Ahmed",
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {names.map((name, index) => {
        return <ContactList
          serial={index+1}
          name={name}
          email={"omarshaikh47@gmail.com"}
          phone={"01923090558"}
          address={"Mirpur 11.5, pallabi"}
        />
      })}
    </>
  );
}

export default App;
