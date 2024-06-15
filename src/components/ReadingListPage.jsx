import React, { useState, useEffect } from 'react';
import { getReadingList, createReadingListItem, updateReadingListItem, deleteReadingListItem, getReadingListMetadata } from './APIService';
import Chat from './Chat';
import './ReadingListPage.css';

const ReadingListPage = () => {
    const userId = 1; // Hardcoded user ID
    const [readingList, setReadingList] = useState([]);
    const [readingListId, setReadingListId] = useState(null);
    const [newItem, setNewItem] = useState({ title: '', author: '', publishYear: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReadingListMetadata();
        loadReadingList();
    }, []);

    const fetchReadingListMetadata = async () => {
        try {
            const metadata = await getReadingListMetadata(userId);
            setReadingListId(metadata.readingListId);
            console.log("Current ReadingList ID:", metadata.readingListId);
        } catch (err) {
            setError(err.message);
        }
    };

    const loadReadingList = async () => {
        try {
            const list = await getReadingList(userId);
            console.log("Reading List API Response:", list);
            setReadingList(list);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreate = async () => {
        try {
            await createReadingListItem({ ...newItem, userId });
            setNewItem({ title: '', author: '', publishYear: null });
            loadReadingList();
        } catch (err) {
            setError(err.response?.data || err.message);
        }
    };    

    const handleUpdate = async (id, updatedItem) => {
        try {
            await updateReadingListItem(id, updatedItem);
            loadReadingList();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteReadingListItem(id);
            loadReadingList();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Your Reading List</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {readingList.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdate(item.id, { ...item, title: e.target.value })}
                            className="form-control mr-2"
                        />
                        <input
                            type="text"
                            value={item.author}
                            onChange={(e) => handleUpdate(item.id, { ...item, author: e.target.value })}
                            className="form-control mr-2"
                        />
                        <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <h2>Add New Book</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newItem.author}
                    onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                    className="form-control mb-2"
                />
                <input
                    type="number"
                    placeholder="Publish Year"
                    value={newItem.publishYear || ''}
                    onChange={(e) => setNewItem({ ...newItem, publishYear: parseInt(e.target.value) })}
                    className="form-control mb-2"
                />
                <button onClick={handleCreate} className="btn btn-primary">Add Book</button>
            </div> <br/>
            {readingListId && <Chat readingListId={readingListId} />}
        </div>
    );
};

export default ReadingListPage;
