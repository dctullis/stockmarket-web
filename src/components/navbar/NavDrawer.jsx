import React, {useState} from 'react'
import {Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const NavDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
        <Drawer PaperProps={{ 
          sx: { backgroundColor: '#2B2B2B' } 
          }} open={open} onClose={() => setOpen(false)}>
          <List>
            <ListItemButton onClick={() => setOpen(!open)} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: '#F4F4F4' }}>
                  Home
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => setOpen(!open)} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: '#F4F4F4' }} >
                  Add Company
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={() => setOpen(!open)} divider>
              <ListItemIcon>
                <ListItemText sx={{ color: '#F4F4F4' }}>
                  List All Companies
                </ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Drawer>
        <IconButton sx={{marginLeft: "auto", color: "#FFB606"}} onClick={() => setOpen(!open)}>
          <MenuRoundedIcon/>
        </IconButton>

    </div>
  )
}

export default NavDrawer