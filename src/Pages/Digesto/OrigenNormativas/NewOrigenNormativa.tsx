import React, { useState } from "react";
import { useStylesForm } from "./styles";
import {
  TextField,
  Button,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

//OUR COMPONENTS
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";

//LIBS
import axiosClient from "../../../config/axios";
import { RouteComponentProps } from "react-router-dom";
import { createOrigenNormativa } from '../../../services/DigestoService'

interface IorigenNormativa {
  codigoOrigen: string;
  descripcion: string;
}

const origenNormativaInicial = {
  codigoOrigen: "",
  descripcion: "",
};

const NewOrigenNormativa: React.FC<RouteComponentProps> = ({ history }) => {
  //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
  const [origen, setOrigen] = useState<IorigenNormativa | any>(origenNormativaInicial);
  const [error, setError] = useState("");
 

  const classes = useStylesForm();

  //enviar lo que hay en el state
  const handleSubmit = async () => {
    try {
      const response = await createOrigenNormativa(origen);
      console.log(response);
      history.push("/origennormativas");
      setError("");
    } catch (error) {
      if(error.response.status === 401){history.push('/login')}
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



  const validation = () => {
    const { codigoOrigen, descripcion } = origen;
    if (
      !codigoOrigen ||
      !descripcion 
    ) {
      return true;
    } else {
      return false;
    }
  };

 

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        {error && <Alert severity="error"><AlertTitle>Ups!</AlertTitle>{ error }</Alert>}

        <TextField
          className={classes.inputs}
          value={origen.codigoOrigen}
          required
          label="Código Origen"
          autoFocus={true}
          name="codigoOrigen"
          inputProps={{ maxLength: 8 }}
          onChange={handleChange}
          placeholder="Código"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="descripcion"
          className={classes.inputs}
          style={{ marginLeft: "2rem" }}
          required
          label="Descripción"
          inputProps={{ maxLength: 40 }}
          value={origen.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          InputLabelProps={{
            shrink: true,
          }}
        />

        
        <div style={{ marginTop: "2rem", display: "flex", marginLeft: "2rem" }}>
          <ButtonConfirm
            title="Guardar Origen Normativa"
            description="Esta seguro que desea crear?"
            onConfirm={handleSubmit}
            disabled={validation()}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "1rem" }}
            onClick={() => { setOrigen(origenNormativaInicial); setError(""); history.push('/origennormativas') }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewOrigenNormativa;