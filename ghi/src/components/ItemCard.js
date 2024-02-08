import accomodations from '../pages/tripOverviewPlaceholderphotos/accomodations.jpg'
import { useAddVoteMutation, useDeleteVoteMutation, useGetVotesQuery } from '../services/itemsApi';

const ItemCard = ({ item, trip_id, buddies}) => {
    const info = {
        trip_id: trip_id,
        item_id:item.item_id
    }



    const [addVote] = useAddVoteMutation()
    const [deleteVote] = useDeleteVoteMutation()
    const { data: votes } = useGetVotesQuery(item.item_id)


    if (!votes) {
        return null
    }
    return (
        <div className="image-card">
           <img className="image" src={/*item.picture_url*/accomodations}  alt="..." />
            <div className="card-footer">
                <div className='col'>
                    <div className='row'>{item.name}</div>
                    <div className='d-flex flex-row justify-content-end'>
                        <p className=''>{`votes: ${votes.votes.length}/${buddies.buddies.length}`}</p>
                        <button onClick={() => addVote(info)} className='vote-button' >Vote</button>
                        <button onClick={() => deleteVote(info)} className='unvote-button'>Unvote</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;
