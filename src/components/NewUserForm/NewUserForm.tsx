import React, { useState, useEffect } from "react";
import { useStyles } from "./styles";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

//OUR COMPONENTS
import ButtonConfirm from "../ButtonConfirm/ButtonConfirm";

//LIBS
import axiosClient from "../../config/axios";
import { RouteComponentProps } from "react-router-dom";

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  role: number;
}

interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
}

const usuarioInicial = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  repeatpassword: "",
  role: null,
};

const NewUserForm: React.FC<RouteComponentProps> = ({ history }) => {
  //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
  const [usuario, setUsuario] = useState<Usuario | any>( usuarioInicial );
  const [roles, setRoles] = useState<Rol[] | any>([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const classes = useStyles();

  //enviar lo que hay en el state
  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post(`/users/`, usuario);
      console.log(response);
      setSuccess(true);
      history.push('/usuarios')
    } catch (error) {
      if(error.response.status === 401){history.push('/login')}
      console.log(error);
      setError(true);
    }
  };


  //Meter lo que van escribiendo en el form en el state
  const handleChange = (e: any) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const validation = () => {
    const { nombre, apellido, email, password, repeatpassword, role } = usuario;
    if (
      !nombre ||
      !apellido ||
      !email ||
      !password ||
      !repeatpassword ||
      !role
    ) {
      return true;
    } else if (password !== repeatpassword) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axiosClient.get("/roles");
        setRoles(response.data);
      } catch (error) {
        if(error.response.status === 401){history.push('/login')}
        console.log(error);
        setError(true);
      }
    };
    getRoles();
  }, []);

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        {success && <Alert severity="success">Creado con éxito</Alert>}
        {error && <Alert severity="error">Ocurrio un error al crear</Alert>}

        <TextField
          className={classes.inputs}
          value={usuario.nombre}
          required
          name="nombre"
          style={{ marginRight: "2rem", marginTop: "1rem" }}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <TextField
          name="apellido"
          className={classes.inputs}
          required
          value={usuario.apellido}
          onChange={handleChange}
          placeholder="Apellido"
        />

        <TextField
          name="email"
          className={classes.inputs}
          required
          value={usuario.email}
          style={{ marginRight: "2rem" }}
          onChange={handleChange}
          placeholder="Email"
          margin="normal"
          type="email"
        />
        <FormControl className={classes.inputs}>
          <Select value={usuario.role || ''} displayEmpty onChange={handleChange} name="role">
            <MenuItem value="" disabled>Seleccione Rol</MenuItem>
            {roles.map((rol: any) => (
              <MenuItem value={rol.id} key={rol.id}>
                {rol.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="password"
          className={classes.inputs}
          required
          style={{ marginRight: "2rem" }}
          onChange={handleChange}
          placeholder="Password"
          margin="normal"
          type="password"
          value={usuario.password}
        />
        <TextField
          name="repeatpassword"
          className={classes.inputs}
          required
          style={{ marginRight: "2rem" }}
          onChange={handleChange}
          placeholder="Repeat Password"
          margin="normal"
          type="password"
          value={usuario.repeatpassword}
        />

        <div style={{ marginTop: "2rem", display: "flex", marginLeft: "2rem" }}>
          <ButtonConfirm
            title="Guardar Usuario"
            description="Esta seguro que desea crear?"
            onConfirm={handleSubmit}
            disabled={validation()}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "1rem" }}
            onClick={() => setUsuario(usuarioInicial)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewUserForm;
