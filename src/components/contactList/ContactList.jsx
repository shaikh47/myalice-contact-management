import { useState } from "react";
import "./contactList.css";

const getRandomColorHex = () => {
  // Generate a random hexadecimal color
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
};

const ContactList = ({ serial, name, photo, email, phone, address }) => {
  return (
    <div className="container">
      <div>{serial}</div>
      <div className="name-container">
        {photo ? (
          <img src={photo} alt="profile photo" className="photo" />
        ) : (
          <div className="no-photo" style={{ background: getRandomColorHex() }}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>{name}</div>
      </div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{address}</div>
    </div>
  );
};

export default ContactList;
