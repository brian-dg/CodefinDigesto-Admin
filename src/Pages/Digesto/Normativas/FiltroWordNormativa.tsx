import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { blue } from '@material-ui/core/colors';


//Our Components
import Title from "../../../components/Title";
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";
import { TextField } from "@material-ui/core/";

import { Alert, AlertTitle } from "@material-ui/lab";

//Others
import { useStyles, useStylesForm } from "./styles";
import axiosClient from "../../../config/axios";
import { Link, useHistory } from "react-router-dom";
import { deleteDocumento } from '../../../services/DigestoService'

const columns = [
    { id: "codigoNormativa", label: "Código", minWidth: 20 },
    { id: "numeroNormativa", label: "Número", minWidth: 20 },
    { id: "año", label: "Año", minWidth: 20 },
    { id: "observaciones", label: "Resumen", minWidth: 200 },
    { id: "fechaEmision", label: "Emisión", minWidth: 170 },
    { id: "vigente", label: "Vigente", minWidth: 30 },
    { id: "archivo", label: "Archivo", minWidth: 20 },
    { id: "editar", label: "Editar", minWidth: 20 },
    { id: "eliminar", label: "Eliminar", minWidth: 20 },
];

interface Inormativa {
    codigoNormativa: string;
    numeroNormativa: number;
    año: number;
    observaciones: string;

}

interface ItipoNormativa {
    codigoNormativa: string;
    descripcion: string;
}

interface IorigenNormativa {
    codigoOrigen: string;
    descripcion: string;
}

const Normativas: React.FC = () => {
    const classes = useStyles();
    const classesForm = useStylesForm();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [normativa, setNormativa] = useState<Inormativa[]>([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<Inormativa[]>([]);
    const [error, setError] = useState("");

    const [palabra, setPalabra] = useState("");


    const history = useHistory();

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getNormativa = async () => {

        try {
            let parametros: string = "";
            if (palabra) { parametros = parametros + "?word=" + palabra };

            const result = await axiosClient.get("/searchnormativas" + parametros);
            console.log(result.data);
            setNormativa(result.data);
            setSearchResult(result.data);
            setError("");

        } catch (e) {
            if (e.response?.status === 401) { history.push('/login') }
            setError(e.response.data.message);
        }
    };

    const searchNormativas = () => {
        const result = normativa.filter((norma) =>
            norma.observaciones.toUpperCase().includes(search.toUpperCase())
        );
        console.log("result", result)
        if (result.length > 0) {
            setSearchResult(result);
        }
        if (search.length === 0) {
            setSearchResult(normativa);
        }
    };

    const deleteNormativa = async (id: number) => {
        try {
            const result = await deleteDocumento(id);
            console.log(result.data);
            getNormativa();
            setError("");
        } catch (e) {
            if (e.response?.status === 401) { history.push('/login') }
            setError(e.response.data.message);
        }
    };

    const abrePdf = (nameFile: string) => {
        window.open("http://192.168.1.86:4000/digesto/" + nameFile + ".pdf", "target=_blank");
    };



    return (
        <>
            <div>
                {error && <Alert severity="error"><AlertTitle>Ups!</AlertTitle>{error}</Alert>}
            </div>
            <div>
                <Title>Búsqueda por palabra</Title>
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem",
                }}
            >



                <div style={{ display: "flex" }}>
                    <TextField
                        label="Buscar por palabra"
                        id="standard-basic"
                        className={classesForm.inputslarge}
                        value={palabra}
                        autoFocus={true}
                        onChange={(e) => setPalabra(e.target.value)}
                        placeholder="Resumen"
                        style={{ marginLeft: "1rem" }}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    />




                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getNormativa}
                        style={{ marginTop: "1rem", marginLeft: "2rem", height: "30px", width: "30%" }}
                    >
                        Buscar
                          </Button>

                </div>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                margin: "1rem",
            }}>
                <TextField
                    id="standard-basic"
                    label="Filtro del resultado"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={searchNormativas}
                    placeholder="Filtro de busqueda"
                />
            </div>



            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResult
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data: any, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell>{data.codigoNormativa?.descripcion}</TableCell>
                                            <TableCell>{data.numeroNormativa}</TableCell>
                                            <TableCell>{data.año}</TableCell>
                                            <TableCell>{data.observaciones}</TableCell>
                                            <TableCell>{data.fechaEmision}</TableCell>
                                            <TableCell>{data.vigente ? <ListItemIcon>
                                                <CheckIcon />
                                            </ListItemIcon> : <ListItemIcon>
                                                    <ClearIcon />
                                                </ListItemIcon>}</TableCell>
                                            <TableCell> <a onClick={() => abrePdf(data.nombreArchivo)}>
                                                <Tooltip title="Ver archivo pdf">
                                                    <ListItemIcon>
                                                        <PictureAsPdfIcon style={{ color: blue[300], cursor: 'pointer' }} />
                                                    </ListItemIcon></Tooltip>
                                            </a>


                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    to={`/normativas/${data.id}`}
                                                    className={classes.links}
                                                >
                                                    <Tooltip title="Editar Normativa">
                                                        <ListItemIcon>
                                                            <EditIcon style={{ color: blue[300], cursor: 'pointer' }} />
                                                        </ListItemIcon></Tooltip>

                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <ButtonConfirm
                                                    onConfirm={() => deleteNormativa(data.id)}
                                                    delete
                                                    title="Eliminar Normativa"
                                                    description="Seguro desea eliminar?"
                                                />

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={normativa.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
};

export default Normativas;