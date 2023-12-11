// import * as React from 'react';
// import { useState } from 'react';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import ListSubheader from '@mui/material/ListSubheader';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // import PeopleIcon from '@mui/icons-material/People';
// // import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
// // import AssignmentIcon from '@mui/icons-material/Assignment';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
// import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
// import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
// import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';


// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import StarBorder from '@mui/icons-material/StarBorder';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import Collapse from '@mui/material/Collapse';
// import List from '@mui/material/List';
// import swal from "sweetalert";

// const handleClick = () => {
//   const [open, setOpen] = useState(false);
//   setOpen(!open);
// };

// const handleLogout = () => {

//   localStorage.removeItem('token');

//   swal({
//     title:"Logout Success",
//     icon:"success",
//     button:'OK'
//   }).then(function(){
//     location.reload();

//   })
// };

// const NavAdmin = () => {
 
//   return (
//     <div>
//       <mainListItems/>
//       <secondaryListItems/>
//     </div>
//   )
  
// }


// export const mainListItems = (
  
//     <React.Fragment>
//       <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/dashboard">
  
//       <ListItemButton>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItemButton>
//       </Link>

//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="เพิ่ม/ลบ/แก้ไข" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>

//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_home">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="หน้าหลัก" />
//           </ListItemButton>
//         </Link>


//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_rooms">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="ข้อมูลห้องพัก" />
//           </ListItemButton>
//         </Link>
        
//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_meeting">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="ข้อมูลห้องประชุม" />
//           </ListItemButton>
//         </Link>

//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_Gym">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="ข้อมูลห้อง Gym" />
//           </ListItemButton>
//         </Link>

//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_Spa">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="ข้อมูลห้องสปา" />
//           </ListItemButton>
//         </Link>

//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_users">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="ข้อมูลผู้ใช้" />
//           </ListItemButton>
//         </Link>


//         <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/edit_payment">
//           <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
//             <InventoryTwoToneIcon />
//             </ListItemIcon>
//             <ListItemText primary="การชำระเงิน" />
//           </ListItemButton>
//         </Link>
//         </List>
       
//       </Collapse>


//       <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/report">
//       <ListItemButton>
//         <ListItemIcon>
//           <LayersIcon />
//         </ListItemIcon>
//         <ListItemText primary="รายงาน" />
//       </ListItemButton>
//       </Link>

      

//     </React.Fragment>
//   )
  
//   export const secondaryListItems = (
    
//     <React.Fragment>
//       <ListSubheader component="div" inset>
       
//       </ListSubheader>

  
//       {/* <Link id="RouterNavLink" style={{textDecoration:"none",color:'#000000'}} to="/login"> */}
//         <ListItemButton onClick={handleLogout}>
//         <ListItemIcon>
//           <LogoutTwoToneIcon />
//         </ListItemIcon>
//         <ListItemText primary="ออกจากระบบ" />
//       </ListItemButton>
//       {/* </Link> */}
  
//     </React.Fragment>
//   );
//   export default NavAdmin;