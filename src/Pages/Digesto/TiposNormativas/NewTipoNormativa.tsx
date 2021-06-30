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
import { createTipoNormativa } from '../../../services/DigestoService';

interface ItipoNormativa {
  codigoNormativa: string;
  descripcion: string;
}

const tipoNormativaInicial = {
  codigoNormativa: "",
  descripcion: "",
};

const NewTipoNormativa: React.FC<RouteComponentProps> = ({ history }) => {
  //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
  const [normativa, setNormativa] = useState<ItipoNormativa | any>(tipoNormativaInicial);
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
 

  const classes = useStylesForm();

  //enviar lo que hay en el state
  const handleSubmit = async () => {
    try {
      const response = await createTipoNormativa(normativa);
      console.log(response);
      history.push("/tiponormativas");
      setErrorTitle("");
      setError("");
    } catch (error) {
      if(error.response.status === 401){history.push('/login')}
      console.log(error);
      const mjeErrorTitle: string = error.response.data.title;
      const mjeError: string = error.response.data.message;
      setErrorTitle(mjeErrorTitle);
      setError(mjeError);
    }
  };

  //Meter lo que van escribiendo en el form en el state
  const handleChange = (e: any) => {
    setNormativa({
      ...normativa,
      [e.target.name]: e.target.value,
    });
  };



  const validation = () => {
    const { codigoNormativa, descripcion } = normativa;
    if (
      !codigoNormativa ||
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
  {error && <Alert severity="error"><AlertTitle>{ errorTitle }</AlertTitle>{ error }</Alert>}

        <TextField
          className={classes.inputs}
          value={normativa.codigoNormativa}
          required
          autoFocus={true}
          name="codigoNormativa"
          inputProps={{ maxLength: 8 }}
          onChange={handleChange}
          placeholder="Código"
          type="text"
        />
        <TextField
          name="descripcion"
          className={classes.inputs}
          style={{ marginLeft: "2rem" }}
          required
          inputProps={{ maxLength: 40 }}
          value={normativa.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
        />

        
        <div style={{ marginTop: "2rem", display: "flex", marginLeft: "2rem" }}>
          <ButtonConfirm
            title="Guardar Tipo Normativa"
            description="Esta seguro que desea crear?"
            onConfirm={handleSubmit}
            disabled={validation()}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: "1rem" }}
            onClick={() => {setNormativa(tipoNormativaInicial); setError("")}}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewTipoNormativa;