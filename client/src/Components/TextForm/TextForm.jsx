import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material';
import { useState } from 'react';
import TodoList from '../TodoList/TodoList';


const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    p: 4,
};
function TextForm() {

    const [user, setUser] = useState({
        title: "",
        desc: "",
    });


    // onchange function
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

// Submit Function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title, desc } = user;

        try {
            const response = await fetch('http://localhost:5000/api/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, desc })
            });
            const data = await response.json();
            setUser({ title: "", desc: "" });
            
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Box sx={style}>

                <TextField id="standard-basic" name="title" label="Type your task" variant="standard" fullWidth value={user.name} onChange={handleInputChange} />
                <TextField id="standard-basic" name="desc" label="Description" variant="standard" fullWidth value={user.desc} onChange={handleInputChange} />

                <Grid container justifyContent="center" marginTop={4}>
                    <Button variant="outlined" style={{ background: "#EC401B", color: "white", border: "none" }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>

            </Box>

            <Box>
                <Grid justifyContent="center" marginTop={40}>
                    <TodoList />
                </Grid>
            </Box>
        </>
    )
}

export default TextForm