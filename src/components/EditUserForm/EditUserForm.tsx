import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStyles } from "./styles";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@material-ui/core";

//OUR COMPONENTS
import ButtonConfirm from "../ButtonConfirm/ButtonConfirm";

//LIBS
import axiosClient from "../../config/axios";
import { RouteComponentProps } from "react-router-dom";

interface Usuario {
  nombre: string;
  apellido: string;
  email: string;
  rol: Rol;
}

interface Rol {
  nombre: string;
}

const usuarioInicial = {
  nombre: "",
  apellido: "",
  email: "",
  rol: {},
};

const EditUserForm: React.FC<RouteComponentProps> = ({ history }) => {
  //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
  const [usuario, setUsuario] = useState<Usuario | any>(usuarioInicial);
  const [edit, setEdit] = useState(false);
  const [roles, setRoles] = useState([]);
  const classes = useStyles();

  //traer el parametro que se pasa en la url
  const { id } = useParams();

  //enviar lo que hay en el state
  const handleSubmit = async () => {
    try {
      const response = await axiosClient.put(`/users/${usuario.id}`, usuario);
      console.log(response);
      history.push("/usuarios");
    } catch (error) {
      if(error.response.status === 401){history.push('/login')}
      console.log(error);
    }
  };

  //Meter lo que van escribiendo en el form en el state
  const handleChange = (e: any) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //Metodo que se ejecuta apenas se crea el componente
  useEffect(() => {
    const getData = async (id: any) => {
      try {
        const user = await axiosClient.get(`/users/${id}`);
        setUsuario(user.data);
        const roles = await axiosClient.get(`/roles`);
        setRoles(roles.data);
      } catch (e) {
        if(e.response.status === 401){history.push('/login')}
        console.log("Ocurrio un error al traer usuario", e);
      }
    };
    getData(id);
  }, [id]);

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          className={classes.inputs}
          value={usuario.nombre || ""}
          required
          name="nombre"
          style={{ marginRight: "2rem" }}
          disabled={!edit}
          onChange={handleChange}
        />
        <TextField
          name="apellido"
          className={classes.inputs}
          required
          value={usuario.apellido || ""}
          disabled={!edit}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          name="email"
          className={classes.inputs}
          required
          value={usuario.email || ""}
          style={{ marginRight: "2rem" }}
          disabled={!edit}
          onChange={handleChange}
          placeholder="Email"
          margin="normal"
          type="email"
        />
      
          <FormControl className={classes.select} >
            <Select
              value={usuario.rol || ""}
              displayEmpty
              onChange={handleChange}
              name="rol"
              disabled={!edit}
            >
              <MenuItem value={usuario.rol || ''} disabled>
                {usuario.rol?.nombre  || ''}
              </MenuItem>
              {roles.map((rol: any) => (
                <MenuItem value={rol.id} key={rol.id}>
                  {rol.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
   
      </div>
      <div style={{ marginTop: "2rem", width: "30%", display: "flex" }}>
        {!edit ? (
          <Button
            variant="contained"
            color="secondary"
            style={{ marginRight: "1rem" }}
            onClick={() => setEdit(!edit)}
            disabled={edit}
          >
            Editar
          </Button>
        ) : (
          <>
            <ButtonConfirm
              title="Guardar Usuario"
              description="Esta seguro que desea guardar los cambios?"
              onConfirm={handleSubmit}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setEdit(false)}
              style={{ marginLeft: "1rem" }}
            >
              Cancelar
            </Button>
          </>
        )}
      </div>
    </form>
  );
};

export default EditUserForm;
