import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Topnav = () => {

    let navigate  = useNavigate();

    const { signout } = useAuth();

    const home = () => navigate('/home');
    const empresa = () => navigate('/empresa');
    const clientes = () => navigate('/clientes');

    return(

        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={console.log('click')}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Topnav;