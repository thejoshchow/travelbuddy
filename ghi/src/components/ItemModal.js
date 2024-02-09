import "../styles/itemModal.css"
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap';
import { useState } from "react";
import ItemUpdate from "../pages/items/ItemUpdate";
import AddModal from './AddModal';

function ItemModal(props) {

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleUpdateButtonClick = () => {
    setShowUpdateModal(true);
    console.log("Update button clicked");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    > {showUpdateModal &&
        <div>
            <AddModal
            show={showUpdateModal}
            onHide={() => setShowUpdateModal(false)}
            modaltitle='Update Item'
            form={<ItemUpdate item={props.item}/>}
             />

        </div>
    }
        <Card className='card-modal'>
         <Card.Header className='card-header2'><img className="modal-image" src={props.item.picture_url} alt=""></img></Card.Header>
            <Card.Body className='item-modal-body'>
                <div>
                    <p>{props.item.name}</p>
                    <p>Description: {props.item.description}</p>
                    <p>${props.item.cost}</p>
                    <p>Notes: {props.item.notes}</p>
                </div>
            <div className="container d-flex justify-content-center align-items-center">
            <button className="btn btn-primary login-button blue-button:hover" onClick={handleUpdateButtonClick}>Update</button>
              </div>
            </Card.Body>
      </Card>

    </Modal>

  );
}

export default ItemModal;

