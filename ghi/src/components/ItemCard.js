const ItemCard = ({item}) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={item.picture_url} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">{item.name} - {item.description}</p>
            </div>
        </div>
    )
}

export default ItemCard;