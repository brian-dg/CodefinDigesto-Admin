import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { getOneDocumento, updateDocumento, deleteDocumento } from '../../services/DigestoService';
import { useParams } from "react-router-dom";
import { useStylesForm } from "./styles";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { RouteComponentProps } from "react-router-dom";
import {
    TextField,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Button,
} from "@material-ui/core";

interface INormativa {
    codigoNormativa: string;
    numeroNormativa: number;
    año: number;
    fechaEmision: string;
    codigoOrigen: string;
    modificaA: string;
    modificadaPor: string;
    observaciones: string;
    vigente: boolean;
    publico: boolean;
    fechaRecepcion: Date;
    nombreArchivo: string;

}

interface ItipoNormativa {
    codigoNormativa: string;
    descripcion: string;
}

interface IorigenNormativa {
    codigoOrigen: string;
    descripcion: string;
}

const normativaInicial = {
    codigoNormativa: "",
    numeroNormativa: 0,
    año: 0,
    fechaEmision: "",
    codigoOrigen: "",
    modificaA: "",
    modificadaPor: "",
    observaciones: "",
    vigente: true,
    publico: false,
    fechaRecepcion: null,
    nombreArchivo: ""

};

/* **** barra de progreso **** */

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });


const NormativaUpload: React.FC<RouteComponentProps> = ({ history }) => {
    const [file, setFile] = useState(''); // storing the uploaded file    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" }); 
    const classesBar = useStyles();   
    const [progress, setProgess] = useState(0); // progess bar

    const [normativa, setNormativa] = useState<INormativa | any>(normativaInicial);
    const [tipos, setTipos] = useState<ItipoNormativa[] | any>([]);
    const [edit, setEdit] = useState(false);
    const [origen, setOrigen] = useState<IorigenNormativa[] | any>([]);
    const [error, setError] = useState("");
    

    const el = useRef<HTMLInputElement>(null); // accesing input element
    const { id } = useParams();
    const classes = useStylesForm();

    const handleSubmit = async () => {
        try {
            const response = await updateDocumento(id, normativa);
            console.log(response);
            history.push("/normativas");
            setError("");
        } catch (error) {
            if (error.response.status === 401) { history.push('/login') }
            setError(error.response.data.message);
        }
    };

    const handleChange = (e: any) => {
        setProgess(0)
        const file = e.target.files[0]; // accediendo al archivo
        console.log(file);
        setFile(file); // almacenando archivo
        
        
        setNormativa(
            {
            ...normativa,
            nombreArchivo: file.name
        });
        
    }
    const uploadFile = async () => {
        try {
            handleSubmit()
            const formData = new FormData();        
            formData.append('file', file); // subiendo archivo
            await axios.post('http://localhost:8000/upload', formData, {
                onUploadProgress: (ProgressEvent) => {
                    let progress = Math.round(
                    ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setProgess(parseInt(progress));
                }
            })
       }
        catch(err) {
            console.log(err)
        }
    }

    

        useEffect(() => {

            const getData = async (id: any) => {
                try {
                    const resultNormativa = await getOneDocumento(id);
                    setNormativa(resultNormativa.data);
    
                    const resultTipos = await axios.get("/tiponormativas");
                    setTipos(resultTipos.data);
    
                    const resultOrigen = await axios.get("/origennormativas");
                    setOrigen(resultOrigen.data);
                    setError("");
    
                } catch (error) {
                    if (error.response.status === 401) { history.push('/login') }
                    setError(error.response.data.message);
                }
            };
    
            getData(id);
        }, [id]);



    return (

        <form className={classes.form} noValidate autoComplete="off">
        <div>
                <div>
                <FormControl className={classes.inputsmed}>
                <InputLabel>Tipo Normativa*</InputLabel>
                    <Select
                        value={normativa.codigoNormativa || ''}
                        displayEmpty
                        required
                        style={{ marginTop: "1rem" }}
                        disabled={true}
                        onChange={handleChange}
                        name="codigoNormativa" >
                        <MenuItem value={normativa.codigoNormativa || ''} disabled>{normativa.codigoNormativa?.descripcion || ''}</MenuItem>
                        {tipos.map((tiponorma: any) => (
                            <MenuItem value={tiponorma.codigoNormativa} key={tiponorma.codigoNormativa}>
                                {tiponorma.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    className={classes.inputsmed}
                    value={normativa.numeroNormativa}
                    required
                    disabled={true}
                    label="Número"
                    autoFocus={true}
                    style={{ marginLeft: "2rem" }}
                    name="numeroNormativa"
                    type="number"
                    inputProps={{ min: "1", max: "99999", step: "1" }}
                    onChange={handleChange}
                    placeholder="Número"
                />
                
                <TextField
                    name="año"
                    className={classes.inputsmed}
                    label="Año"
                    disabled={true}
                    required
                    style={{ marginLeft: "2rem" }}
                    type="number"
                    inputProps={{ min: "2019", max: "2050", step: "1" }}
                    value={normativa.año}
                    onChange={handleChange}
                    placeholder="Año"
                />                
                </div>
               
            <div className="file-upload" style={{ marginTop: "4rem" }}>
                <input 
                    type="file" 
                    ref={el} onChange={handleChange} 
                />               
                <div className={classesBar.root} style={{ marginTop: "2rem" }}>
                    <LinearProgressWithLabel value={progress} />
                </div>
                <div className="file-upload" style={{ marginTop: "4rem" }}>
                <Button 
                    onClick={uploadFile} className="upbutton"
                    variant="contained"
                    color="primary"
                >                  
                 Subir Archivo
                </Button>
                </div>
            </div>
        </div>
        </form>
    );
}
export default NormativaUpload;