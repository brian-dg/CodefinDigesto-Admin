import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useStyles } from "./styles";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/actions/AuthActions";
import {RootStore} from '../../redux/Store';

//Other Libs
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const authError = useSelector<RootStore, string>( state  => state.AuthState.authError)
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(logIn({ email, password, history }));
    } catch (e) {
      console.log('hay error',e);
    }
  };
  console.log('desde logon',authError)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            error={authError.length > 0 ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
          />
          <TextField
            error={authError ? true : false}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Aceptar
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Login;
