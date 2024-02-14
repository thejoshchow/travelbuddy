import { useAddVoteMutation, useDeleteVoteMutation, useGetVotesQuery } from '../services/itemsApi';
import ItemModal from './ItemModal';
import { useGetAccountQuery } from '../services/authApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item, trip_id, buddies }) => {
    const [showItem, setShowItem] = useState(false);
    const [voted, setVoted] = useState(false);
    const [voteCount, setVoteCount] = useState(0); 
    const info = {
        trip_id: trip_id,
        item_id: item.item_id,
    };
    
   
    const [addVote] = useAddVoteMutation();
    const [deleteVote] = useDeleteVoteMutation();
    const { data: votes } = useGetVotesQuery(item.item_id);
    const { data: account } = useGetAccountQuery();
    useEffect(() => {
            if (votes?.votes && account?.user_id) {
                const initialVoteCount = votes.votes.length;
                setVoteCount(initialVoteCount);
                setVoted(votes.votes.includes(account.user_id));
            }
        }, [votes, account]);

    
    // rgb state and rg info
    const [greenValue, setGreenValue] = useState(255);
    const [redValue, setRedValue] = useState(255);
    const [blueValue, setBlueValue] = useState(255);
        
    useEffect(() => {
    const maxVotes = buddies.buddies.length; 
    const voteThreshold = maxVotes / 2 ;
    if (voteCount > voteThreshold) {
        setRedValue(203);
        setGreenValue(243);
        setBlueValue(240);
    } else {
        setRedValue(255);
         setGreenValue(255);
        setBlueValue(255);
    }
         
}, [voteCount, buddies.buddies.length]);

    
    //ui update
    const AddVote = async () => {
        await addVote(info);
        setVoteCount(prev => prev + 1); 
        setVoted(true);
    };

    const DeleteVote = async () => {
        await deleteVote(info);
        setVoteCount(prev => Math.max(0, prev - 1)); 
        setVoted(false);
    };

    if (!votes) {
        return null;
    }

    return (
        <>
            <ItemModal show={showItem} onHide={() => setShowItem(false)} item={item} />
                <div className="image-card" style={{ backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})` }}>
                <Link onClick={() => setShowItem(true)}>
                    <img className="image" src={item.picture_url} alt="..." />
                </Link>
                <div className="card-footer">
                    <div className='col'>
                        <div className='row'>{item.name}</div>
                        <div className='d-flex flex-row justify-content-end'>
                            <p className='me-3'>{`votes: ${voteCount}/${buddies.buddies.length}`}</p>
                            {!voted ?
                                <button onClick={AddVote} className='vote-button'>Vote</button>
                                : <button onClick={DeleteVote} className='unvote-button'>Unvote</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemCard;
