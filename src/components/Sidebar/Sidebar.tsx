import React from "react";
import clsx from "clsx";
import { IconButton, Drawer, List, Divider } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router-dom";

//STYLES
import { useStyles } from "./styles";

//OUR COMPONENTS
import { MainLinks, SecondaryLinks } from "../../components/LinkList/LinkList";

//Redux
import {useDispatch} from 'react-redux';
import {logOut} from '../../redux/actions/AuthActions';


interface Prop {
  handleDrawerClose: () => void;
  open: boolean;
}

const Sidebar = ({ handleDrawerClose, open }: Prop) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()

  const handleLogout = () => {
    try {
      dispatch(logOut())
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List><MainLinks/></List>
      <Divider />
      <List><SecondaryLinks logout={handleLogout}/></List>
    </Drawer>
  );
};

export default Sidebar;
