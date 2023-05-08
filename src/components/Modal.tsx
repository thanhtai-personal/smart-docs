import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ReactModal = (props: any) => {
  const {
    isOpen = false,
    afterOpenModal = () => {},
    closeModal = () => {},
    onClose,
    children = "",
  } = props;
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {onClose && (
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <i className="fa-sharp fa-solid fa-xmark"></i>
        </div>
      )}
      {children}
    </Modal>
  );
};

export default ReactModal;
