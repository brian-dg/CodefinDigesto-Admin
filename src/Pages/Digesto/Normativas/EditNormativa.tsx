import React, { useState, useEffect } from "react";
import { useStylesForm } from "./styles";
import { useParams } from "react-router-dom";
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
import { getOneDocumento, updateDocumento, deleteDocumento } from '../../../services/DigestoService';

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

const EditNormativa: React.FC<RouteComponentProps> = ({ history }) => {
    //seteando stados, el primero es donde se guarda el estado y el segundo es una fucion que lo cambia
    const [normativa, setNormativa] = useState<INormativa | any>(normativaInicial);
    const [tipos, setTipos] = useState<ItipoNormativa[] | any>([]);
    const [edit, setEdit] = useState(false);
    const [origen, setOrigen] = useState<IorigenNormativa[] | any>([]);

    const [error, setError] = useState("");


    const classes = useStylesForm();
    const { id } = useParams();

    //enviar lo que hay en el state
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


    const deleteNormativa = async (codigoOrigen: string) => {
        try {
            const result = await deleteDocumento(id);
            console.log(result.data);
            history.push("/normativas");
            setError("");
        } catch (e) {
            if (e.response.status === 401) { history.push('/login') }
            setError(e.response.data.message);
        }
    };



    useEffect(() => {

        const getData = async (id: any) => {
            try {
                const resultNormativa = await getOneDocumento(id);
                setNormativa(resultNormativa.data);

                const resultTipos = await axiosClient.get("/tiponormativas");
                setTipos(resultTipos.data);

                const resultOrigen = await axiosClient.get("/origennormativas");
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
                {error && <Alert severity="error"><AlertTitle>Ups!</AlertTitle>{ error }</Alert>}


                <FormControl className={classes.inputs}>
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

                <TextField
                    name="observaciones"
                    className={classes.inputslarge}
                    required
                    label="Resumen"
                    disabled={!edit}
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
                <InputLabel style={{ marginTop: "1rem" }}>Origen Normativa*</InputLabel>
                    <Select style={{ marginTop: "2rem" }} disabled={!edit} value={normativa.codigoOrigen!} displayEmpty onChange={handleChange} name="codigoOrigen">
                        <MenuItem value={normativa.codigoOrigen || ''} disabled>{normativa.codigoOrigen?.descripcion || ''}</MenuItem>
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
                    label="Fecha emisión"
                    required
                    disabled={!edit}
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
                    label="Fecha"
                    disabled={!edit}
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
                    disabled={!edit}
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
                    disabled={!edit}
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
                        disabled={!edit}
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
                        disabled={!edit}
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
                        disabled={!edit}
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
                                    onClick={() => { setEdit(false); setError(""); history.push('/normativas') }}
                                    style={{ marginLeft: "1rem" }}

                                >
                                    Cancelar
            </Button>

                            </>
                        )}
                </div>
            </div>
        </form>
    );
};

export default EditNormativa;