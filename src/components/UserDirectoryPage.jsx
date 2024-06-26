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
            <h1 className="mb-4">User Directory</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>
                                    <Link to={`/reading-list/other/${user.id}`} className="btn btn-primary btn-sm">
                                        View Reading List
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDirectoryPage;
