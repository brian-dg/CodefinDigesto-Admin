import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { useStylesForm,useStyles } from "./styles";
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
import { getOneTipoNormativa, updateTipoNormativa } from '../../../services/DigestoService';
interface ITipoNormativa {
  codigoNormativa: string;
  descripcion: string;
}

const tipoNormativaInicial = {
  codigoNormativa: "",
  descripcion: "",
};

const EditTipoNormativa: React.FC<RouteComponentProps> = ({ history }) => {
  //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
  const [normativa, setNormativa] = useState<ITipoNormativa | any>(tipoNormativaInicial);
  const [edit, setEdit] = useState(false);
  const[errorTitle, setErrorTitle] = useState("");
  const[error, setError] = useState("");

  const classes = useStylesForm();
  const classess = useStyles();
  //traer el parametro que se pasa en la url
  const { codigoNormativa } = useParams();

  //enviar lo que hay en el state
  const handleSubmit = async () => {
    try { 
      const response =  await  updateTipoNormativa(codigoNormativa, normativa);  
      console.log(response);
      setError("");
      history.push("/tiponormativas");
    } catch (error) {
      if(error.response.status === 401){history.push('/login')}
      const mjeErrorTitle: string = error.response.data.title;
      const msjError: string =  error.response.data.message;
      setErrorTitle(mjeErrorTitle);
      setError(msjError);
    }
  };

  //Meter lo que van escribiendo en el form en el state
  const handleChange = (e: any) => { 
    setNormativa({
      ...normativa,
      [e.target.name]: e.target.value,
    });
  };

  //Metodo que se ejecuta apenas se crea el componente
  useEffect(() => {
    const getNormativa = async () => { 
      try { 
        const resultado =  await getOneTipoNormativa(codigoNormativa);  
        setNormativa(resultado.data);
      } catch (e) {
        if(e.response.status === 401){history.push('/login')}
        const mjeErrorTitle: string = e.response.data.title;
        const msjError: string =  e.response.data.message;
        setErrorTitle(mjeErrorTitle);
        setError(msjError);
      }
    };
    getNormativa();
  }, [codigoNormativa]);

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    > <div>
    {error && <Alert severity="error"><AlertTitle>{ errorTitle }</AlertTitle>{ error }</Alert>}
    </div>
      <div>
        <TextField
          className={classes.inputs}
          value={normativa.codigoNormativa || ""}
          required
          name="Código"
          style={{ marginRight: "2rem" }}
          disabled={true}
          onChange={handleChange}
        />
        <TextField
          name="descripcion"
          className={classes.inputs}
          autoFocus={true}
          required
          value={normativa.descripcion || ""}
          disabled={!edit}
          onChange={handleChange}
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
              title="Guardar Tipo Normativa"
              description="Esta seguro que desea guardar los cambios?"
              onConfirm={handleSubmit}
            />
            
            <Link
                          to={`/tiponormativas`} className={classess.links}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => { setEdit(false); setError("")}}
              style={{ marginLeft: "1rem" }}
            >
              Cancelar
            </Button>
            </Link>
            
          </>
        )}
      </div>
    </form>
  );
};

export default EditTipoNormativa;