import { useState } from "react";
import { useGetCategoriesQuery } from "../services/categoryApi";
import AddModal from "./AddModal"; 
import ItemsForm from "../pages/items/ItemsForm";

const CategoriesMenu = ({ trip_id }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery(trip_id)
    const [showModal, setShowModal] = useState(false);

    while (isLoading) {
        return null
    }
    return (
        <>
        <AddModal show={showModal} onHide={() => setShowModal(false)} modaltitle='Add item' form={<ItemsForm trip={trip_id} />} />
        <div className='container d-flex flex-row'>
            <div className='mr-3'>
                <button 
                    onClick={() => setShowModal(true)}
                    className='btn btn-secondary me-3'>Add item</button>
            </div>
            <div>
                <ul className="nav nav-underline">
                    {categories.map((cat) => {
                        return (
                            <li key={cat.category_id} className="nav-item">
                                <a className="nav-link" aria-current="page" href={`/trip/${trip_id}/${cat.category_id}`}>{cat.category_name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
        </>
    )
}

export default CategoriesMenu;