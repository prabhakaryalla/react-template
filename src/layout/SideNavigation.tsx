import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CommentsIcon from '@mui/icons-material/Comment';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { Link } from 'react-router-dom';

const SideNavigation = () => {
    return ( <React.Fragment>
        <ListItemButton component={Link} to={"/dashboard"}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/orders"}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/users"} >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText  primary="Users" />
        </ListItemButton>
        <ListItemButton component={Link} to={"/comments"}>
          <ListItemIcon>
            <CommentsIcon />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Integrations" />
        </ListItemButton>
      </React.Fragment>);
}

export default SideNavigation;

   