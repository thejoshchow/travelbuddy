import CategoriesMenu from "../../components/CategoriesMenu";
import { useParams } from "react-router-dom";
import { useGetItemsQuery } from "../../services/itemsApi";
import ItemCard from "../../components/ItemCard";
import { useGetCategoriesQuery } from "../../services/categoryApi";

const Items = () => {
    const { trip_id, category_id } = useParams()
    const info = {
        trip_id: trip_id,
        category_id: category_id,
    }
    const { data: items, isLoading } = useGetItemsQuery(info)

    return (
        isLoading ? null :
        <div className='d-flex flex-column'>
            <CategoriesMenu trip_id={trip_id} />
            <div className='d-flex flex-row flex-wrap justify-content-around'>
                {items.items.map((item) => {
                    return <ItemCard key={item.item_id} item={item} />
            })}
            </div>
        </div>
    )
}

export default Items;