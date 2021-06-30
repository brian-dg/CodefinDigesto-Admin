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
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { ListItemIcon } from "@material-ui/core/";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import BackupIcon from '@material-ui/icons/Backup';
import { blue, red, green } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';



//Our Components
import Title from "../../../components/Title";
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";
import { TextField } from "@material-ui/core/";


//Others
import { useStyles } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { getDocumento, deleteDocumento } from '../../../services/DigestoService'

const columns = [
    { id: "codigoNormativa", label: "Código", minWidth: 20 },
    { id: "numeroNormativa", label: "Número", minWidth: 20 },
    { id: "año", label: "Año", minWidth: 20 },
    { id: "observaciones", label: "Resumen", minWidth: 220 },
    { id: "fechaEmision", label: "Emision", minWidth: 170 },
    { id: "vigente", label: "Vigente", minWidth: 20 },
    { id: "archivo", label: "Archivo", minWidth: 20 },
    { id: "editar", label: "Editar", minWidth: 20 },
    { id: "eliminar", label: "Eliminar", minWidth: 20 },

];

interface Inormativa {
    codigoNormativa: string;
    numeroNormativa: number;
    año: number;
    observaciones: string;
    fechaAlta: string;
    horaAlta: string;

}




const Normativas: React.FC = () => {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [normativa, setNormativa] = useState<Inormativa[]>([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<Inormativa[]>([]);
    const [error, setError] = useState("");


    const history = useHistory();

    const handleChangePage = (event: any, newPage: any) => {
        console.log("pagina", newPage)

        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const getNormativa = async () => {
        try {
            const result = await getDocumento();
            console.log(result.data);
            setNormativa(result.data);
            setSearchResult(result.data);
            setError("");

        } catch (e) {
            if (e.response.status === 401) { history.push('/login') }
            setError(e.response.data.message);
        }
    };

    const deleteNormativa = async (id: number) => {
        try {
            const result = await deleteDocumento(id);
            console.log(result.data);
            getNormativa();
            setError("")
        } catch (e) {
            if (e.response.status === 401) { history.push('/login') }
            setError(e.response.data.message);
        }
    };

    const searchNormativas = () => {
        const result = normativa.filter((norma) =>
            norma.observaciones.toUpperCase().includes(search.toUpperCase())
        );
        
        if (result.length > 0) {
            setSearchResult(result);
           
            
        }
        if (search.length === 0) { 
            setSearchResult(normativa);
        }
    };

    const abrePdf = (nameFile: string) => {
        window.open("http://192.168.1.86:8000/public/" + nameFile, "target=_blank");
    };

    useEffect(() => {
        getNormativa();
    }, []);

    return (
        <>
            <div>
                {error && <Alert severity="error"><AlertTitle>Ups!</AlertTitle>{error}</Alert>}
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "1rem",
                    marginTop: "2rem",
                }}
            >
                <div>
                    <Title>Normativas</Title>

                    <TextField
                        id="standard-basic"
                        label="Buscar"
                        autoFocus={true}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyUp={searchNormativas}
                        placeholder="Resumen"
                    />

                </div>
                <Link to={`/normativas/crear`} className={classes.links}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: "1rem" }}
                    >
                        Crear Nueva Normativa
          </Button>
                </Link>
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
                                                <CheckIcon style={{ color: green[300] }} />
                                            </ListItemIcon> : <ListItemIcon>
                                                    <ClearIcon style={{ color: red[300] }} />
                                                </ListItemIcon>}</TableCell>
                                            <TableCell>{data.nombreArchivo ? <a onClick={() => abrePdf(data.nombreArchivo)}>
                                                <Tooltip title="Ver archivo pdf">
                                                    <ListItemIcon>
                                                        <PictureAsPdfIcon style={{ color: green[300], cursor: 'pointer' }} />
                                                    </ListItemIcon></Tooltip>
                                            </a> :  <Link
                                                    to={`/normativaupload/${data.id}`}
                                                    className={classes.links}
                                                >
                                                <Tooltip title="Subir Copia">
                                                    <ListItemIcon>
                                                        <BackupIcon style={{ color: blue[300], cursor: 'pointer' }} />
                                                    </ListItemIcon></Tooltip>
                                            </Link>}


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