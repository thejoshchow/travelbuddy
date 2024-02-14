import "../styles/itemModal.css"
import Modal from 'react-bootstrap/Modal';
import { Card } from 'react-bootstrap';
import { useState } from "react";
import ItemUpdate from "../pages/items/ItemUpdate";
import AddModal from './AddModal';
import { useDeleteItemMutation } from "../services/itemsApi";

function ItemModal(props) {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [deleteItem] = useDeleteItemMutation();

  const handleUpdateButtonClick = () => {
    setShowUpdateModal(true);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await deleteItem({
        trip_id: props.item.trip_id,
        item_id: props.item.item_id,
      });
    } catch (error) {
      console.error("An error occurred while deleting an item", error);
    }
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
            <div className="item-container d-flex">
            <button className="btn blue-button" onClick={handleUpdateButtonClick}>Update</button>
            <button className="btn red-button" onClick={handleDeleteButtonClick}>Delete Item</button>
            </div>
          </Card.Body>
      </Card>

    </Modal>

  );
}

export default ItemModal;

