import { useState, useEffect } from "react";
import "./contactPage.css";
import Cookies from "js-cookie";
import { Form, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ContactList from "../components/contactList/ContactList";
import Navbar from "../components/navbar/Navbar";

import { getLoggedInUserInfo } from "../apis/users";
import { getAllContacts } from "../apis/contact";
import Modal from "../components/general/Modal";

function findMatchingContacts(searchValue, contacts) {
  const lowercasedSearch = searchValue.toLowerCase();

  return contacts.reduce((matchedIndices, contact, index) => {
    const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
    const tags = contact.labels.map((label) => label.label_name.toLowerCase());
    const address = contact.address.toLowerCase();

    if (
      fullName.includes(lowercasedSearch) ||
      tags.some((tag) => tag.includes(lowercasedSearch)) ||
      address.includes(lowercasedSearch)
    ) {
      matchedIndices.push(index);
    }

    return matchedIndices;
  }, []);
}

const ListHeader = () => {
  return (
    <div className="contact-list-heading">
      <div className="contact-list-cell" style={{ flex: "1" }}>
        SERIAL
      </div>
      <div className="contact-list-cell">
        <div>NAME</div>
      </div>
      <div className="contact-list-cell">NAME</div>
      <div className="contact-list-cell">PHONE</div>
      <div className="contact-list-cell">ADDRESS</div>
      <div className="contact-list-cell">TAGS</div>
    </div>
  );
};

function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(-1);

  useEffect(() => {
    console.log(selectedContact);
  }, [selectedContact]);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

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
        setContacts(res.data.contact_profiles);
      })
      .catch((err) => {
        console.log("Some error occured: ", err);
      });
  }, []);

  useEffect(() => {
    console.log("search val: ", search);
    const indicesToShow = findMatchingContacts(search, contacts);
    console.log("indicesToShow val: ", indicesToShow);
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="contact-page-container">
        <div className="add-contact-button-container">
          <Button
            className="add-contact-button"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedContact(-1);
              showModal();
            }}
          >
            Add Contact
          </Button>
        </div>
        <div className="contact-table-container">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="search-input commonStyles"
            placeholder="Search"
          />
          <ListHeader />
          {contacts.map((contact, index) => {
            if (findMatchingContacts(search, contacts).includes(index)) {
              return (
                <ContactList
                  onClick={() => {
                    setSelectedContact(index);
                    showModal();
                  }}
                  key={index}
                  serial={index + 1}
                  name={`${contact.first_name} ${contact.last_name}`}
                  email={contact.email}
                  phone={contact.contact_numbers}
                  address={contact.address}
                  tags={contact.labels}
                />
              );
            }
          })}
        </div>
      </div>

      <Modal
        open={modalVisible}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        initialValues={contacts}
        selectedContact={selectedContact}
      />
    </>
  );
}

export default ContactPage;
