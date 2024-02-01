import { useGetCategoriesQuery } from "../services/categoryApi";

const CategoriesMenu = ({ trip_id }) => {
    const { data: categories, isLoading } = useGetCategoriesQuery(trip_id)
    while (isLoading) {
        return null
    }
    return (
        <div className='container d-flex flex-row'>
            <div className='mr-3'>
                <button className='btn btn-secondary me-3'>Add item</button>
            </div>
            <div>
                <ul class="nav nav-underline">
                    {categories.map((cat) => {
                        return (
                            <li key={cat.category_id} class="nav-item">
                                <a class="nav-link active" aria-current="page" href={cat.category_id}>{cat.category_name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default CategoriesMenu;