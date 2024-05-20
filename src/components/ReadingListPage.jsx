import React, { useState, useEffect } from 'react';
import { getReadingList, createReadingListItem, updateReadingListItem, deleteReadingListItem } from './APIService';
import Chat from './Chat';

const ReadingListPage = () => {
    const userId = 4007; // Hardcoded user ID
    const [readingList, setReadingList] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', author: '', publishYear: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        loadReadingList();
    }, []);

    const loadReadingList = async () => {
        try {
            const list = await getReadingList(userId);
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
            setError(err.message);
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
        <div>
            <h1>Your Reading List</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {readingList.map(item => (
                    <li key={item.id}>
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleUpdate(item.id, { ...item, title: e.target.value })}
                        />
                        <input
                            type="text"
                            value={item.author}
                            onChange={(e) => handleUpdate(item.id, { ...item, author: e.target.value })}
                        />
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Add New Book</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newItem.author}
                    onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Publish Year"
                    value={newItem.publishYear || ''}
                    onChange={(e) => setNewItem({ ...newItem, publishYear: parseInt(e.target.value) })}
                />
                <button onClick={handleCreate}>Add Book</button>
            </div>
            <Chat />
        </div>
    );
};

export default ReadingListPage;
