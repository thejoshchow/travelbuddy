import CategoriesMenu from "../../components/CategoriesMenu";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "../../services/itemsApi";
import ItemCard from "../../components/ItemCard";
import { useGetBuddyQuery } from "../../services/buddiesApi";
import "./items.css"

const Items = () => {
    const { trip_id, category_id } = useParams()
    const info = {
        trip_id: trip_id,
        category_id: category_id,
    }
    const { data: items, isLoading } = useGetItemsQuery(info)
    const { data: buddies } = useGetBuddyQuery(trip_id)



    return (
        isLoading ? null :
        <>
        
        <div className='navbar-items'>
                <CategoriesMenu trip_id={trip_id} />
                <div className='items d-flex flex-row flex-wrap'>
                    {items.items.map((item) => {
                        return (
                            <div key={item.item_id}>
                                <ItemCard buddies={buddies} item={item} trip_id={trip_id} />
                            </div>
                        )
                })}
                </div>
        </div>
        </>
    )
}

export default Items;
