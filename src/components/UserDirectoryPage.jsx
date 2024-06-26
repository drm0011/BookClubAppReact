import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from './APIService';

const UserDirectoryPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                setUsers(userList);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h1>User Directory</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">
                        <Link to={`/reading-list/other/${user.id}`}>
                            {user.username}'s Reading List
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDirectoryPage;
