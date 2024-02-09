import { useState } from "react";
import { useAddItemMutation } from "../../services/itemsApi";
import { useGetCategoriesQuery } from "../../services/categoryApi";
import SuccessAlert from "../../components/SucessAlert";
import Spinner from "../../components/Spinner";

const ItemsForm = ({ trip }) => {
    const [addItem, { isLoading, isSuccess }] = useAddItemMutation()
    const { data: categories } = useGetCategoriesQuery(trip)
    const [formData, setFormData] = useState({
        category_id: '',
        name: '',
        description: '',
        url: '',
        cost: 0,
        costPerPerson: true,
        notes: ''
    })
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addItem({ form: formData, trip_id: trip })
    }

    return (
        <div className='container'>
            <Spinner isLoading={isLoading} />
            <SuccessAlert isSuccess={isSuccess} message='Item added' />
            <form className={!isSuccess ? null : 'd-none'} onSubmit={handleSubmit}>
                <div className='form-floating'>
                    <select onChange={handleFormChange} name='category_id' id='item-category' className="form-select form-floating mb-3">
                        <option value=''>Select category</option>
                        {categories.map((category) => {
                            return (
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            )
                        })}
                    </select>
                    <label htmlFor="item-category">Category</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.name} onChange={handleFormChange} type="text" className="form-control" name="name" id="item-name" placeholder="Item name" />
                    <label htmlFor="item-name">Item name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea value={formData.description} onChange={handleFormChange} type="text" className="form-control" id="item-description" name="description" placeholder="Item description" style={{height: '100px'}}/>
                    <label htmlFor="description">Item description</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.url} onChange={handleFormChange} type="text" className="form-control" id="item-url" name="url" placeholder="Item url" />
                    <label htmlFor="item-url">Item url</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={formData.cost} onChange={handleFormChange} type="number" className="form-control" name="cost" id="item-cost" placeholder="Item cost" />
                    <label htmlFor="item-cost">Item cost</label>
                </div>
                <div className="form-check mb-3">
                    <input value={true} onChange={handleFormChange} type="radio" className="form-check-input" id="item-costPerPerson" name="costPerPerson"/>
                    <label className="form-check-label" htmlFor="costPerPerson1" >
                        Per Person
                    </label>
                </div>
                <div className="form-check mb-3">
                    <input value={false} onChange={handleFormChange} type="radio" className="form-check-input" id="item-costPerPerson" name="costPerPerson"/>
                    <label className="form-check-label" htmlFor="costPerPerson2" >
                        For Group
                    </label>
                </div>
                <div className="form-floating mb-3">
                    <textarea value={formData.notes} onChange={handleFormChange} type="text" className="form-control" id="item-notes" name="notes" placeholder="Notes" style={{height: '100px'}} />
                    <label htmlFor="item-notes">Notes</label>
                </div>
                <button className="btn blue-button">Add Item</button>
            </form>
        </div>
    )
}

export default ItemsForm;
