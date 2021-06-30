import React, { useState, useEffect } from "react";
import { useStylesForm } from "./styles";
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

import { Alert, AlertTitle } from "@material-ui/lab";

//OUR COMPONENTS
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";

//LIBS
import axiosClient from "../../../config/axios";
import { RouteComponentProps } from "react-router-dom";
import { createDocumento } from '../../../services/DigestoService';

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

const NewNormativa: React.FC<RouteComponentProps> = ({ history }) => {
    //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
    const [normativa, setNormativa] = useState<INormativa | any>(normativaInicial);
    const [tipos, setTipos] = useState<ItipoNormativa[] | any>([]);
    const [origen, setOrigen] = useState<IorigenNormativa[] | any>([]);
    const [error, setError] = useState("");



    const classes = useStylesForm();

    //enviar lo que hay en el state
    const handleSubmit = async () => {
        try {
            const response = await createDocumento(normativa);
            console.log(response);
            setError("");
            history.push("/normativas");
        } catch (error) {
            if (error.response.status === 401) { history.push('/login') }
            setError(error.response.data.message);
        }
    };

    //Meter lo que van escribiendo en el form en el state
    const handleChange = (e: any) => {
        if (
            e.target.name === "vigente" ||
            e.target.name === "publico"

        ) {
            setNormativa({
                ...normativa,
                [e.target.name]: e.target.checked,
            });
        } else {


            setNormativa({
                ...normativa,
                [e.target.name]: e.target.value,
            });
        }
    };

    const validation = () => {
        const { codigoNormativa, numeroNormativa, año, codigoOrigen, fechaEmision, observaciones } = normativa;
        if (
            !codigoNormativa ||
            !numeroNormativa ||
            !año ||
            !observaciones ||
            !codigoOrigen ||
            !fechaEmision
        ) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        const getTipos = async () => {
            try {
                const response = await axiosClient.get("/tiponormativas");
                setTipos(response.data);
                setError("")
            } catch (error) {
                if (error.response.status === 401) { history.push('/login') }
                setError(error.response.data.message);
            }
        };

        const getOrigen = async () => {
            try {
                const response = await axiosClient.get("/origennormativas");
                setOrigen(response.data);
                setError("")
            } catch (error) {
                if (error.response.status === 401) { history.push('/login') }
                setError(error.response.data.message);
            }
        };

        getTipos();
        getOrigen();
    }, []);


    return (
        <form className={classes.form} noValidate autoComplete="off">
            <div>
                {error && <Alert severity="error"><AlertTitle>Ups!</AlertTitle>{error}</Alert>}


                <FormControl className={classes.inputs}>
                    <InputLabel>Código Normativa*</InputLabel>
                    <Select
                        value={normativa.codigoNormativa!}
                        displayEmpty
                        style={{ marginTop: "1rem" }}
                        onChange={handleChange}
                        name="codigoNormativa" >
                        <MenuItem value="">&nbsp;</MenuItem>
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
                    required
                    style={{ marginLeft: "2rem" }}
                    type="number"
                    inputProps={{ min: "2019", max: "2050", step: "1" }}
                    value={normativa.año}
                    onChange={handleChange}
                    placeholder="Año"
                />

                <TextField
                    name="observaciones"
                    className={classes.inputslarge}
                    required
                    label="Resumen"
                    multiline={true}
                    rowsMax={4}
                    style={{ marginTop: "1rem" }}
                    value={normativa.observaciones}
                    onChange={handleChange}
                    placeholder="Resumen"
                    InputLabelProps={{
                        shrink: true,
                    }}

                />

                <FormControl className={classes.inputs}>
                    <InputLabel style= { { marginTop:"1rem"}}>Origen Normativa*</InputLabel>
                    <Select style={{ marginTop: "2rem" }} value={normativa.codigoOrigen!} displayEmpty onChange={handleChange} name="codigoOrigen" required>
                        <MenuItem value="">&nbsp;</MenuItem>
                        {origen.map((origennorma: any) => (
                            <MenuItem value={origennorma.codigoOrigen} key={origennorma.codigoOrigen}>
                                {origennorma.descripcion}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    className={classes.inputsmed}
                    value={normativa.fechaEmision}
                    required
                    label="Fecha emisión"
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                    name="fechaEmision"
                    type="date"
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="fechaRecepcion"
                    className={classes.inputsmed}
                    label="Fecha recepción"
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                    value={normativa.fechaRecepcion}
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    type="date"
                />

                <TextField
                    style={{ marginTop: "1rem" }}
                    name="modificaA"
                    className={classes.inputs}
                    label="Modifica a:"
                    inputProps={{ maxLength: 15 }}
                    value={normativa.modificaA}
                    onChange={handleChange}
                    placeholder="Modifica a"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    name="modificadaPor"
                    className={classes.inputs}
                    label="Modificada por:"
                    style={{ marginTop: "1rem", marginLeft: "2rem" }}
                    inputProps={{ maxLength: 15 }}
                    value={normativa.modificadaPor}
                    onChange={handleChange}
                    placeholder="Modificada por"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <div>
                    <FormControlLabel
                        name="vigente"
                        style={{ marginTop: "1rem" }}
                        className={classes.checkbox}
                        value={normativa.vigente}
                        checked={normativa.vigente}
                        control={<Checkbox color="primary" />}
                        label="Vigente"
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        name="publico"
                        className={classes.checkbox}
                        value={normativa.publico}
                        checked={normativa.publico}
                        style={{ marginTop: "1rem", marginLeft: "1rem" }}
                        control={<Checkbox color="primary" />}
                        label="Público"
                        onChange={handleChange}
                    />
                    <TextField
                        name="nombreArchivo"
                        className={classes.inputs}
                        label="Nombre Archivo:"
                        style={{ marginTop: "1rem" }}
                        inputProps={{ maxLength: 100 }}
                        value={normativa.nombreArchivo}
                        onChange={handleChange}
                        placeholder="Nombre Archivo"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        helperText="Nombre de archivo sin extensión"
                    />
                </div>

                <div style={{ marginTop: "2rem", display: "flex" }}>
                    <ButtonConfirm
                        title="Guardar Normativa"
                        description="Esta seguro que desea crear?"
                        onConfirm={handleSubmit}
                        disabled={validation()}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => {setNormativa(normativaInicial); setError(""); history.push('/normativas') }}
                    >
                        Cancelar
          </Button>
                </div>
            </div>
        </form>
    );
};

export default NewNormativa;