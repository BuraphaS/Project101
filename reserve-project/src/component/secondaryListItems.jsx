import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

import swal from "sweetalert";
const secondaryListItems = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');
      
        swal({
          title:"ออกจากระบบ",
          icon:"success",
          button:'OK'
        }).then(function(){
          navigate('/')
          location.reload();
      
        })
      };
  return (
    <div>
        <React.Fragment>
      <ListSubheader component="div" inset>
       
      </ListSubheader>

  
      {/* <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/login"> */}
        <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <LogoutTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="ออกจากระบบ" />
      </ListItemButton>
      {/* </Link> */}
  
    </React.Fragment>
    </div>
  )
}

export default secondaryListItems