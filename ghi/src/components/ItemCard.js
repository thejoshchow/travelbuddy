import accomodations from '../pages/tripOverviewPlaceholderphotos/accomodations.jpg'


const ItemCard = ({ item }) => {
    return (
        <div className="image-card">
           <img className="image" src={/*item.picture_url*/accomodations}  alt="..." />
             <div className="card-footer">
                {item.description}
               <div className="vote-button"> {"Vote"} </div>
            </div>
        </div>
    )
}

export default ItemCard;
         
           