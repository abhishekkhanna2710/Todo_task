import { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';


import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Paper,
    Typography,
} from '@mui/material';
function TodoList() {
    const tableStyle = {
        background: "#92C7F3"
    }
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/todo');
                const data = await res.json();
                setTodos(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, []);


    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setTodos(todos.filter(e => e.id !== id));
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    return (
        <div>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={tableStyle}>
                            <TableCell><b>Sr No</b></TableCell>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {todos.map((e) => (
                            <TableRow key={e._id}>
                                <TableCell>{e.userId}</TableCell>
                                <TableCell>{e.title}</TableCell>
                                <TableCell>{e.desc}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleUpdate(e.id)}><EditOutlinedIcon /></Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(e.id)}><DeleteOutlineTwoToneIcon /></Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>
        </div>
    );
}

export default TodoList;
