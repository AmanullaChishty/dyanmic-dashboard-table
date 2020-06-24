import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import AccountCircle from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import logo from '../images/logo.png'

const colors=['#ffcc5e52','#ff738752','#26c9b852','#988c8552','#60d8eb52']


export default function Navbar({changeTheme}){
  return(
  <div className="navbar">
    <AppBar position="static" >
        <Toolbar>
          <img src={logo}  alt="logo" width="150px" height="50px" />
          <IconButton className="nav-btn" edge="start" color="inherit" aria-label="dashboard">
            <DashboardIcon />
          </IconButton>
          <Typography className="nav-header " variant="h6">
            Dashboard
          </Typography>
          {colors.map((item,i)=>{
            return(<IconButton className="nav-btn" color="inherit" key={i} onClick={()=>changeTheme(item)}><FiberManualRecordIcon style={{color:item.slice(0, -2)}}/></IconButton>)
          })
          }
          <IconButton className="nav-btn" color="inherit"><AccountCircle /></IconButton>
        </Toolbar>
    </AppBar>
  </div>
    
  )
}
