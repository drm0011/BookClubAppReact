import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOtherUserReadingList } from './APIService';
import Chat from './Chat';
import './ReadingListPage.css';

const ReadOnlyReadingListPage = () => {
    const { userId } = useParams(); // Assuming you're using React Router to pass userId
    const [readingList, setReadingList] = useState([]);
    const [readingListId, setReadingListId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadReadingList = async () => {
            try {
                const list = await getOtherUserReadingList(userId);
                console.log("Fetched Reading List: ", list);
                setReadingList(list);
                if (list.length > 0) {
                    setReadingListId(list[0].readingListId);
                }
            } catch (err) {
                console.error("Error fetching reading list: ", err);
                setError(err.message);
            }
        };
        loadReadingList();
    }, [userId]);

    return (
        <div className="container mt-4">
            <h1>User's Reading List</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {readingList.map(item => (
                    <li key={item.id} className="list-group-item">
                        <div>{item.title}</div>
                        <div>{item.author}</div>
                        <div>{item.publishYear}</div>
                    </li>
                ))}
            </ul>
            <br/>
            {readingListId && <Chat readingListId={readingListId} />}
        </div>
    );
};

export default ReadOnlyReadingListPage;
