import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Collapse,
  ListSubheader,
} from "@material-ui/core/";


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import ClassIcon from '@material-ui/icons/Class';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';


import { Link } from "react-router-dom";

const styles = {
  link: {
    textDecoration: "none",
    color: "black",
  },
};





export const MainLinks = () => {

  const [openConsulta, setOpenConsulta] = React.useState(false);

  const handleClick = (e: string) => {
    switch (e) {
      case 'Menu Digesto':
        setOpenConsulta(!openConsulta);
        break;

      case 'Consulta':
        setOpenConsulta(!openConsulta);
        break;

    }
  };

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      nested: {
        paddingLeft: theme.spacing(4),
      },
    }),
  );
  const classes = useStyles();

  return (
    <div>
      <Link to={"/"} style={styles.link}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>




      <ListItem button onClick={() => handleClick('Menu Digesto')}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Menu Digesto" />
        {openConsulta ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openConsulta} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <Link to={"/tiponormativas"} style={styles.link}>
            <ListItem button>
              <ListItemIcon>
                <ClassIcon />
              </ListItemIcon>
              <ListItemText primary="Tipos Normativas" />
            </ListItem>
          </Link>

          <Link to={"/origennormativas"} style={styles.link}>
            <ListItem button>
              <ListItemIcon>
                <SwapHorizIcon />
              </ListItemIcon>
              <ListItemText primary="Origen Normativas" />
            </ListItem>
          </Link>

          <Link to={"/normativas"} style={styles.link}>
            <ListItem button>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Normativas" />
            </ListItem>
          </Link>

          <Link to={"/usuarios"} style={styles.link}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItem>
          </Link>


          <ListItem >
            <ListItemIcon>
              <ExpandMoreIcon />
            </ListItemIcon>
            <ListItemText primary="Consultas" />
          </ListItem>

          
        </List>

        <List component="div" disablePadding>
          <Link to={"/searchnormativas"} style={styles.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText primary="Aplicar filtros" />
            </ListItem>
          </Link>
        </List>

        <List component="div" disablePadding>
          <Link to={"/searchwordnormativas"} style={styles.link}>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Búsqueda palabra" />
            </ListItem>
          </Link>
        </List>

        


      </Collapse>


    </div>
  );
};


interface Props {
  logout: () => void;
}

export const SecondaryLinks = ({ logout }: Props) => {
  return (
    <div>
      <ListSubheader inset>Reportes</ListSubheader>

      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Este mes" />
      </ListItem>

      <ListItem button onClick={logout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};
