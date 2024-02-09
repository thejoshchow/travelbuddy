import { useState } from "react";
import { useGetCategoriesQuery } from "../services/categoryApi";
import { useLocation,useNavigate } from 'react-router-dom';
import AddModal from "./AddModal"; 
import ItemsForm from "../pages/items/ItemsForm";
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../styles/items.css"

const CategoriesMenu = ({ trip_id }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery(trip_id)
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
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
                <Nav className="navbar-nav">
                    <button
                        onClick={() => setShowModal(true)}
                        className='btn-add-item mr-3'>
                        Add Item
                    </button>
                    {categories.map((cat) => {
                        const currentPath = `/trip/${trip_id}/${cat.category_id}`; 
                        return (
                            <Link 
                                className={`navbar-categories ${location.pathname === currentPath ? 'active' : ''}`} 
                                to={currentPath}
                                key={cat.category_id}>
                                {capitalizeFirstLetter(cat.category_name)}
                            </Link>
                        );
                    })}
                    <button
                        onClick={() => navigate(`/trip/${trip_id}`)}
                        className='back-dash'>
                        Trip Overview
                    </button>
                </Nav>
            </Navbar>
        </>
    );
};

export default CategoriesMenu;
                                    
                            