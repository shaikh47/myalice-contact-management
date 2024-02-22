import "./modal.css";
import ContactForm from "./ContactForm";

const Modal = ({ initialValues, selectedContact, open, showModal, handleOk, handleCancel }) => {
  const onSubmit = (data) => {
    console.log("submit data: ", data);
  };

  console.log("here: ", initialValues, selectedContact)

  const handleContentClick = (e) => {
    // Prevent the click event from reaching the container
    e.stopPropagation();
  };

  return (
    <div className="modal-container" style={{ display: open?"flex":"none"}} onClick={handleCancel}>
      <div className="modal-content" onClick={handleContentClick}>
        {/* <ContactForm onSubmit={onSubmit} /> */}
        <ContactForm initialValues={initialValues} onSubmit={onSubmit} selectedContact={selectedContact}/>
      </div>
    </div>
  );
};

export default Modal;
