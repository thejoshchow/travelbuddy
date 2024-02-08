import accomodations from '../ph_photos/accomodations.jpg'
import { useAddVoteMutation, useDeleteVoteMutation, useGetVotesQuery } from '../services/itemsApi';
import ItemModal from './ItemModal';
import { useGetAccountQuery } from '../services/authApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, trip_id, buddies  }) => {
    const [showItem, setShowItem] = useState(false)
    const [voted, setVoted] = useState()
    const info = {
        trip_id: trip_id,
        item_id:item.item_id
    }



    const [addVote] = useAddVoteMutation()
    const [deleteVote] = useDeleteVoteMutation()
    const { data: votes } = useGetVotesQuery(item.item_id)
    const { data: {account} } = useGetAccountQuery()
    useEffect(() => {
        if (votes?.votes) {
            setVoted(votes.votes.includes(account.user_id))
        }
    }, [votes?.votes, account?.user_id])


    if (!votes) {
        return null
    }
    return (
        <>
        <ItemModal show={showItem} onHide={() => setShowItem(false)} item={item} />
        <div className="image-card">
           <Link onClick={()=> setShowItem(true)}>
               <img className="image" src={/*item.picture_url*/accomodations}  alt="..." />
           </Link>
            <div className="card-footer">
                <div className='col'>
                    <div className='row'>{item.name}</div>
                    <div className='d-flex flex-row justify-content-end'>
                        <p className='me-3'>{`votes: ${votes.votes.length}/${buddies.buddies.length}`}</p>
                        { !voted ?
                        <button onClick={() => addVote(info)} className='vote-button' >Vote</button>
                        : <button onClick={() => deleteVote(info)} className='unvote-button'>Unvote</button>
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ItemCard;
