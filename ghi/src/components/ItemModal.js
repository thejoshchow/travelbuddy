import "./itemModal.css"
import accomodations from '../pages/tripOverviewPlaceholderphotos/accomodations.jpg'
import Button from 'react-bootstrap/Button';
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
         <Card.Header className='card-header2'><img className="modal-image" src={accomodations}></img></Card.Header>
            <Card.Body className='modal-body'>
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