import { useState } from "react";
import "./contactList.css";
import { generateColorFromWord } from "../../utils/misc";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteContact } from "../../apis/contact";
import Cookies from "js-cookie";
import { message } from "antd";

const getRandomColorHex = () => {
  // Generate a random hexadecimal color
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
};

const onDeleteClick = async (id) => {
  try {
    const response = await deleteContact(
      id,
      JSON.parse(Cookies.get("contact")).accessToken
    );
    console.log(response)
    message.success("Deleted Successfully.");
  } catch (err) {
    console.log(err)
    message.error("Some error occured, could not delete");
  }
};

const ContactList = ({
  serial,
  name,
  photo,
  email,
  phone,
  address,
  tags,
  onClick,
  contact_id,
  onDelete
}) => {
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
      <div
        className="delete-button contact-list-cell"
        style={{ flex: "1" }}
        onClick={async (e) => {
          e.stopPropagation();
          await onDeleteClick(contact_id);
          console.log("delete", contact_id);
          await onDelete()
        }}
      >
        <DeleteOutlined className="delete-button" />
      </div>
    </div>
  );
};

export default ContactList;
