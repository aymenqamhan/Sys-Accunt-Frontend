import React, { useEffect, useState } from 'react';
import { getReturns, deleteReturn } from '../../api/returns';
import { Link } from 'react-router-dom';

const ReturnListPage = () => {
    const [returns, setReturns] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReturns = async () => {
            try {
                const response = await getReturns();
                setReturns(response.data);
            } catch (error) {
                setError('Failed to fetch returns.');
                console.error(error);
            }
        };
        fetchReturns();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteReturn(id);
            setReturns(returns.filter((ret) => ret.return_id !== id));
        } catch (error) {
            setError('Failed to delete return.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Returns</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link to="/returns/new">Add Return</Link>
            <table>
                <thead>
                    <tr>
                        <th>Return ID</th>
                        <th>Sale ID</th>
                        <th>Return Date</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {returns.map((ret) => (
                        <tr key={ret.return_id}>
                            <td>{ret.return_id}</td>
                            <td>{ret.sale}</td>
                            <td>{new Date(ret.return_date).toLocaleDateString()}</td>
                            <td>{ret.reason}</td>
                            <td>
                                <Link to={`/returns/edit/${ret.return_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(ret.return_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReturnListPage;