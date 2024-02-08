import "../styles/itemModal.css"
import accomodations from '../ph_photos/accomodations.jpg'
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap';

function ItemModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Card className='card-modal'>
         <Card.Header className='card-header2'><img className="modal-image" src={accomodations} alt=""></img></Card.Header>
            <Card.Body className='item-modal-body'>
                <div>
                    <p>{props.item.name}</p>
                    <p>Description: {props.item.description}</p>
                    <p>${props.item.cost}</p>
                    <p>Notes: {props.item.notes}</p>
                </div>
            </Card.Body>
        </Card>
    </Modal>
  );
}

export default ItemModal;
