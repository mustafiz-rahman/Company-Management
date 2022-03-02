import React, { Component } from "react";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';


export default class Login extends Component{
    render(){
        return(
            <Stack
            component="form"
            alignItems="center"
            
            sx={{
                width:'55ch',
                maxWidth: '100%', 
            }}
            
            spacing={2}
            noValidate
            autoComplete="off"
            >
            <TextField id="fullWidth" label="Email" variant="outlined" />
            <TextField id="filled-password-input" label="Password" type="password" variant="outlined" />
            </Stack>
        );
    }
}