import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modaltitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.form}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default AddModal;