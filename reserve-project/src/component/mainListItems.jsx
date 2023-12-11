import * as React from 'react';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from 'react-router-dom';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';



import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

const mainListItems = () => {
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(!open);
      };
  return (
    <div>

      <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/dashboard">
  
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="แดชบอร์ด" />
      </ListItemButton>
      </Link>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="เพิ่ม/ลบ/แก้ไข" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_home">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="หน้าหลัก" />
          </ListItemButton>
        </Link>


        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_rooms">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="ห้องพัก" />
          </ListItemButton>
        </Link>
        
        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_meeting">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="ห้องประชุม" />
          </ListItemButton>
        </Link>

        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_Gym">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="ห้องออกกำลังกาย" />
          </ListItemButton>
        </Link>

        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_Spa">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="ห้องสปา" />
          </ListItemButton>
        </Link>

        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_users">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="ข้อมูลผู้ใช้" />
          </ListItemButton>
        </Link>


        <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_payment">
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
            <InventoryTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary="การชำระเงิน" />
          </ListItemButton>
        </Link>
        </List>
       
      </Collapse>


      <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/report">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="รายงานการจอง" />
      </ListItemButton>
      </Link>

    </div>
  )
}

export default mainListItems