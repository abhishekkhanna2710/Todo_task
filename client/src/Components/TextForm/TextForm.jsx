import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Button } from '@mui/material';
import { useState } from 'react';
const style = {
    position: 'absolute',
    top: '23%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    p: 4,
};
function TextForm() {
    const [user, setUser] = useState({
        name: "",
        desc: "",
    });

    // onchange function
    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        // console.log(user)
    }

    // Submit function
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, desc } = user;

        console.log(user)
    }
    return (
        <Box sx={style}>

            <TextField id="standard-basic" name="name" label="Type your task" variant="standard" fullWidth value={user.name} onChange={handleInputChange} />
            <TextField id="standard-basic" name="desc" label="Description" variant="standard" fullWidth value={user.desc} onChange={handleInputChange} />

            <Grid container justifyContent="center" marginTop={4}>
                <Button variant="outlined" style={{ background: "#EC401B", color: "white", border: "none" }} onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>
        </Box>
    )
}

export default TextForm