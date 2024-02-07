import CategoriesMenu from "../../components/CategoriesMenu";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "../../services/itemsApi";
import ItemCard from "../../components/ItemCard";
import { useGetCategoriesQuery } from "../../services/categoryApi";
import "./items.css"

const Items = () => {
    const { trip_id, category_id } = useParams()
    const info = {
        trip_id: trip_id,
        category_id: category_id,
    }
    const { data: items, isLoading } = useGetItemsQuery(info)



    return (
        isLoading ? null :
        <div className='navbar-items'>
                <CategoriesMenu trip_id={trip_id} />
     
                <div className='items d-flex flex-row flex-wrap'>
                    {items.items.map((item) => {
                        return  <ItemCard key={item.item_id} item={item} /> 
                })}
                </div>
       
        </div>
    )
}

export default Items;