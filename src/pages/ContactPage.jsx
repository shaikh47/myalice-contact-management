import { useState, useEffect } from "react";
import "./contactPage.css";
import Cookies from "js-cookie";

import ContactList from "../components/contactList/ContactList";
import Navbar from "../components/navbar/Navbar";

import { getLoggedInUserInfo } from "../apis/users";
import { getAllContacts } from "../apis/contact";

const names = [
  "Syed Md Omar Shaikh",
  "Saifullah Saif",
  "Irafanul Islam",
  "Shafi Uddin Ahmed",
];

function ContactPage() {
  const [contacts, setContacts] = useState([]);

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

  useEffect(() => {
    console.log("Cookie: ", JSON.parse(Cookies.get("contact")));
    getAllContacts(JSON.parse(Cookies.get("contact")).accessToken)
      .then((res) => {
        console.log("response: ", res);
        setContacts(res.data.contact_profiles)
      })
      .catch((err) => {
        console.log("Some error occured: ", err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="contact-page-container">
        {contacts.map((contact, index) => {
          return (
            <ContactList
              key={index}
              serial={index + 1}
              name={`${contact.first_name} ${contact.last_name}`}
              email={contact.email}
              phone={contact.contact_numbers}
              address={contact.address}
              tags={contact.labels}
            />
          );
        })}
      </div>
    </>
  );
}

export default ContactPage;
