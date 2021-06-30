import React from "react";
import {
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core/";

//Other libs
import { Route, Switch } from "react-router-dom";

import { useStyles } from "./styles";

//Our Components
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import NormativaUpload from "../../components/NormativaUpload/NormativaUpload"

import TiposNormativas from '../../Pages/Digesto/TiposNormativas/TiposNormativas';
import EditTipoNormativa from '../../Pages/Digesto/TiposNormativas/EditTipoNormativa';
import NewTipoNormativa from '../../Pages/Digesto/TiposNormativas/NewTipoNormativa';

import OrigenNormativas from '../../Pages/Digesto/OrigenNormativas/OrigenNormativas';
import NewOrigenNormativa from '../../Pages/Digesto/OrigenNormativas/NewOrigenNormativa';
import EditOrigenNormativa from '../../Pages/Digesto/OrigenNormativas/EditOrigenNormativa';

import Normativas from '../../Pages/Digesto/Normativas/Normativas';
import NewNormativa from '../../Pages/Digesto/Normativas/NewNormativa';
import EditNormativa from '../../Pages/Digesto/Normativas/EditNormativa';
import FiltroNormativa from '../../Pages/Digesto/Normativas/FiltroNormativa';
import FiltroWordNormativa from '../../Pages/Digesto/Normativas/FiltroWordNormativa';

import MainView from "../MainView/MainView";
import Usuarios from "../Usuarios/Usuarios";
import Copyright from '../../components/Copyright/Copyright';
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import NewUserForm from "../../components/NewUserForm/NewUserForm";


export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Switch>
              <Route exact path="/" component={MainView} />

              <Route exact path="/usuarios" component={Usuarios} />
              <Route exact path="/usuarios/crear" component={NewUserForm} />
              <Route exact path="/usuarios/:id" component={EditUserForm} />

              <Route exact path="/tiponormativas" component={TiposNormativas} />
              <Route exact path="/tiponormativas/crear" component={NewTipoNormativa} />
              <Route exact path="/tiponormativas/:codigoNormativa" component={EditTipoNormativa} />

              <Route exact path="/origennormativas" component={OrigenNormativas} />
              <Route exact path="/origennormativas/crear" component={NewOrigenNormativa} />
              <Route exact path="/origennormativas/:codigoOrigen" component={EditOrigenNormativa} />

              <Route exact path="/normativas" component={Normativas} />
              <Route exact path="/normativas/crear" component={NewNormativa} />
              <Route exact path="/normativas/:id" component={EditNormativa} />
              <Route exact path="/searchnormativas" component={FiltroNormativa} />
              <Route exact path="/searchwordnormativas" component={FiltroWordNormativa} />

              <Route exact path="/normativaupload/:id" component={NormativaUpload} />


            </Switch>
          </Grid>
          <Copyright />
        </Container>
      </main>
    </div>
  );
}
