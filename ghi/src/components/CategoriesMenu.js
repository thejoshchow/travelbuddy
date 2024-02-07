import { useState } from "react";
import { useGetCategoriesQuery } from "../services/categoryApi";
import { useLocation } from 'react-router-dom';
import AddModal from "./AddModal"; 
import ItemsForm from "../pages/items/ItemsForm";
import "../pages/items/items.css"
import { Nav, Navbar } from 'react-bootstrap';
import "../pages/items/items.css"

const CategoriesMenu = ({ trip_id }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery(trip_id)
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    // don't really need this because of the font but will keep it in in case we change it
    const capitalizeFirstLetter = (string) => {

    return string.charAt(0).toUpperCase() + string.slice(1);
}
       
    if(isLoading){
        return null
    }
    return (
        <>
            <AddModal show={showModal} onHide={() => setShowModal(false)} modaltitle='Add item' form={<ItemsForm trip={trip_id} />} />
            <Navbar className='nav-container'>
                <Nav className="mr-auto d-flex flex-row">
                    <button
                        onClick={() => setShowModal(true)}
                        className='btn-add-item mr-3'>
                        Add Item
                    </button>
                    {categories.map((cat) => {
                        const currentPath = `/trip/${trip_id}/${cat.category_id}`; 
                        return (
                            <Nav.Link 
                                className={`navbar-categories ${location.pathname === currentPath ? 'active' : ''}`} 
                                href={currentPath}
                                key={cat.category_id}>
                                {capitalizeFirstLetter(cat.category_name)}
                            </Nav.Link>
                        );
                    })}
                </Nav>
            </Navbar>
        </>
    );
};

export default CategoriesMenu;
                                    
                            