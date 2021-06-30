import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStylesForm } from "./styles";
import {
  TextField,
  Button,
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

//OUR COMPONENTS
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";

//LIBS
import axiosClient from "../../../config/axios";
import { RouteComponentProps } from "react-router-dom";
import { getOneOrigenNormativa, updateOrigenNormativa } from '../../../services/DigestoService';

interface IorigenNormativa {
  codigoOrigen: string;
  descripcion: string;
}

const origenNormativaInicial = {
  codigoOrigen: "",
  descripcion: "",
};

const EditOrigenNormativa: React.FC<RouteComponentProps> = ({ history }) => {
  //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
  const [origen, setOrigen] = useState<IorigenNormativa | any>(origenNormativaInicial);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const classes = useStylesForm();

  //traer el parametro que se pasa en la url
  const { codigoOrigen } = useParams();

  //enviar lo que hay en el state
  const handleSubmit = async () => {
    try {
      const response = await updateOrigenNormativa(codigoOrigen, origen);
      console.log(response);
      history.push("/origennormativas");
      setError("");
    } catch (error) {
      if (error.response.status === 401) { history.push('/login') }
      setError(error.response.data.message);
    }
  };

  //Meter lo que van escribiendo en el form en el state
  const handleChange = (e: any) => {
    setOrigen({
      ...origen,
      [e.target.name]: e.target.value,
    });
  };

  //Metodo que se ejecuta apenas se crea el componente
  useEffect(() => {
    const getOrigen = async () => {
      try {
        const resultado = await getOneOrigenNormativa(codigoOrigen);
        setOrigen(resultado.data);
        setError("");
      } catch (e) {
        if (e.response.status === 401) { history.push('/login') }
        setError(e.response.data.message);
      }
    };
    getOrigen();
  }, [codigoOrigen]);

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        {error && <Alert severity="error"><AlertTitle>Ups!</AlertTitle>{error}</Alert>}
        <TextField
          className={classes.inputs}
          value={origen.codigoOrigen || ""}
          required
          label="Código Origen"
          name="Código"
          style={{ marginRight: "2rem" }}
          disabled={true}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="descripcion"
          className={classes.inputs}
          autoFocus={true}
          label="Descripción"
          required
          value={origen.descripcion || ""}
          disabled={!edit}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
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
                title="Guardar Origen Normativa"
                description="Esta seguro que desea guardar los cambios?"
                onConfirm={handleSubmit}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => { setEdit(false); setError(""); history.push('/origennormativas') }}
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

export default EditOrigenNormativa;