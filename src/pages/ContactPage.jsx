import { useState, useEffect } from "react";
import "./contactPage.css";
import Cookies from "js-cookie";

import ContactList from "../components/contactList/ContactList";
import Navbar from "../components/navbar/Navbar";

import { getLoggedInUserInfo } from "../apis/users";

const names = [
  "Syed Md Omar Shaikh",
  "Saifullah Saif",
  "Irafanul Islam",
  "Shafi Uddin Ahmed",
];

function ContactPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Cookie: ", JSON.parse(Cookies.get("contact")));
    getLoggedInUserInfo(JSON.parse(Cookies.get("contact")).accessToken)
      .then((res) => {
        console.log("response: ", res);
      })
      .catch((err) => {
        console.log("Some error occured: ", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="contact-page-container">
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
      </div>
    </>
  );
}

export default ContactPage;
