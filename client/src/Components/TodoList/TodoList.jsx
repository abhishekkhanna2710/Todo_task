import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import Checkbox from '@mui/material/Checkbox';

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Paper,
    Modal,
    FormControl,
    Select,
    MenuItem,
    Box,
    TextField,
    Grid

} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function TodoList() {
    const tableStyle = {
        background: "#92C7F3"
    }

    const [todos, setTodos] = useState([]);
    const [state, setState] = useState(false);
    const [filter, setFilter] = useState("All");
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }



    const handleClose = () => setOpen(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    // fetching the data
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/todo');
                const data = await res.json();
                setState(!state);
                setTodos(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTodos();
    }, [state]);



    // deleting the data
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setTodos(todos.filter(e => e.id !== id));
                setState(!state);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };



    // Handle change

    const handleComplete = (id, isCompleted) => {
        fetch(`http://localhost:5000/api/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isCompleted: !isCompleted })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setState(!state);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    // filtering
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredTodos = filter === "All"
        ? todos
        : todos.filter(todo => filter === "Completed" ? todo.isCompleted : !todo.isCompleted);

    return (
        <div>

            <Grid container justifyContent={"left"}>
                <Box sx={{ minWidth: 120, marginTop:2, marginBottom:2 }}>
                    <FormControl fullWidth>
                        <Select
                            value={filter}

                            onChange={handleFilterChange}
                            style={{ color: "red" }}>
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Not Completed">Not Completed</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl >
                </Box>
            </Grid>

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
                        {/* // filtering the data */}
                        {filteredTodos.map((e) => (
                            <TableRow key={e._id}>
                                <TableCell> <Checkbox {...label} checked={e.isCompleted} onChange={() => handleComplete(e._id, e.isCompleted)} /></TableCell>

                                <TableCell>{e.title}</TableCell>
                                <TableCell>{e.desc}</TableCell>
                                <TableCell>


                                    {/* upDATE tODO */}

                                    <Button variant="contained" color="primary" onClick={handleOpen}><EditOutlinedIcon /></Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <TextField id="standard-basic" name="title" label="Type your task" variant="standard" fullWidth />
                                            <TextField id="standard-basic" name="desc" label="Description" variant="standard" fullWidth />

                                            <Grid container justifyContent="center" marginTop={4}>
                                                <Button variant="outlined" style={{ background: "#EC401B", color: "white", border: "none" }} >
                                                    Update
                                                </Button>
                                            </Grid>
                                        </Box>
                                    </Modal>

                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(e._id)}><DeleteOutlineTwoToneIcon /></Button>

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
