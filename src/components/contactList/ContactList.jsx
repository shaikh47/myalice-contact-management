import { useState } from "react";
import "./contactList.css";
import { generateColorFromWord } from "../../utils/misc";

const getRandomColorHex = () => {
  // Generate a random hexadecimal color
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
};

const ContactList = ({ serial, name, photo, email, phone, address, tags, onClick }) => {
  return (
    <div className="container" onClick={onClick}>
      <div className="contact-list-cell" style={{ flex: "1" }}>
        {serial}
      </div>
      <div className="name-container contact-list-cell">
        {photo ? (
          <img src={photo} alt="profile photo" className="photo" />
        ) : (
          <div className="no-photo" style={{ background: getRandomColorHex() }}>
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>{name}</div>
      </div>
      <div className="contact-list-cell">{email}</div>
      <div className="contact-list-cell">
        {phone.length === 0 ? "" : phone[0].number}
      </div>
      <div className="contact-list-cell">{address}</div>
      <div className="tags-container contact-list-cell">
        {tags.map((tag, index) => {
          return (
            <div className="tag-chip" key={index}>
              {tag.label_name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
