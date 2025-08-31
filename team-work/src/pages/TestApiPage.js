import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/users';

const TestApiPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                console.log('API Response:', response.data);
                setUsers(response.data);
            } catch (err) {
                console.error('API Error:', err);
                setError('Failed to fetch users. Check console for details.');
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Users List (Test)</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))
                ) : (
                    <p>Loading users...</p>
                )}
            </ul>
        </div>
    );
};

export default TestApiPage;