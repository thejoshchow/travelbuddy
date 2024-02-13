import { useState } from "react";
import { useUpdateItemMutation } from "../../services/itemsApi";
import SuccessAlert from "../../components/SucessAlert";
import Spinner from "../../components/Spinner";

const ItemUpdate = ({ item }) => {
    const [updateItem, { isLoading, isSuccess }] = useUpdateItemMutation();
    const [formData, setFormData] = useState(item)
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateItem(formData);
        } catch (error) {
            console.error('An error occurred while updating an item', error)
        }


    };


    return (
        <div className='container'>
            <Spinner isLoading={isLoading} />
            <SuccessAlert isSuccess={isSuccess} message='Item Updated!' />
            <form className={!isSuccess ? null : 'd-none'} onSubmit={handleSubmit}>

                <div className="form-floating mb-3">
                    <input
                        value={formData.name}
                        onChange={handleFormChange} type="text"
                        className="form-control"
                        name="name"
                        id="item-name"
                        placeholder="Item name" />
                    <label htmlFor="item-name">Item name</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea
                        value={formData.description}
                        onChange={handleFormChange}
                        type="text"
                        className="form-control"
                        id="item-description"
                        name="description"
                        placeholder="Item description"
                        style={{ height: '100px' }} />
                    <label htmlFor="description">Item description</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        value={formData.url}
                        onChange={handleFormChange}
                        type="text"
                        className="form-control"
                        id="item-url"
                        name="url"
                        placeholder="Item url" />
                    <label htmlFor="item-url">Item url</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        value={formData.cost}
                        onChange={handleFormChange}
                        type="number"
                        className="form-control"
                        name="cost"
                        id="item-cost"
                        placeholder="Item cost" />
                    <label htmlFor="item-cost">Item cost</label>
                </div>

                <div className="form-check mb-3">
                    <input
                        value={true}
                        onChange={handleFormChange}
                        type="radio"
                        className="form-check-input"
                        id="item-costPerPerson"
                        name="costPerPerson" />
                    <label className="form-check-label" htmlFor="costPerPerson1" >
                        Per Person
                    </label>
                </div>

                <div className="form-check mb-3">
                    <input
                        value={false}
                        onChange={handleFormChange}
                        type="radio"
                        className="form-check-input"
                        id="item-costPerPerson"
                        name="costPerPerson" />
                    <label className="form-check-label" htmlFor="costPerPerson2" >
                        For Group
                    </label>
                </div>

                <div className="form-floating mb-3">
                    <textarea
                        value={formData.notes}
                        onChange={handleFormChange}
                        type="text"
                        className="form-control"
                        id="item-notes"
                        name="notes"
                        placeholder="Notes"
                        style={{ height: '100px' }} />
                    <label htmlFor="item-notes">Notes</label>
                </div>

                <button className="btn blue-button">Update Item</button>
            </form>
        </div>
    )
}

export default ItemUpdate;
