import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [actions, setActions] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        assigned_to: '',
        priority: 'Medium',
        due_date: ''
    });

    const fetchActions = () => {
        axios.get('http://localhost:5000/actions')
            .then(res => setActions(res.data));
    };

    useEffect(() => {
        fetchActions();
    }, []);

    const createAction = () => {
        axios.post('http://localhost:5000/actions', form)
            .then(() => {
                fetchActions();
            });
    };

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:5000/actions/${id}`, { status })
            .then(fetchActions);
    };

    const deleteAction = (id) => {
        axios.delete(`http://localhost:5000/actions/${id}`)
            .then(fetchActions);
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Action Tracker</h2>

            <h3>Create Action</h3>
            <input placeholder="Title" onChange={e => setForm({...form, title: e.target.value})} /><br/>
            <input placeholder="Description" onChange={e => setForm({...form, description: e.target.value})} /><br/>
            <input placeholder="Assigned To" onChange={e => setForm({...form, assigned_to: e.target.value})} /><br/>
            <input type="date" onChange={e => setForm({...form, due_date: e.target.value})} /><br/>
            <select onChange={e => setForm({...form, priority: e.target.value})}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select><br/><br/>

            <button onClick={createAction}>Add Action</button>

            <h3>Actions List</h3>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Assigned</th>
                        <th>Status</th>
                        <th>Due</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map(a => (
                        <tr key={a.id}>
                            <td>{a.title}</td>
                            <td>{a.assigned_to}</td>
                            <td>{a.status}</td>
                            <td>{a.due_date}</td>
                            <td>
                                <button onClick={() => updateStatus(a.id, 'Completed')}>
                                    Complete
                                </button>
                                <button onClick={() => deleteAction(a.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;