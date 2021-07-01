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
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import { ListItemIcon } from "@material-ui/core/";
import { blue } from '@material-ui/core/colors';
import { Alert, AlertTitle } from "@material-ui/lab";



//Our Components
import Title from "../../../components/Title";
import ButtonConfirm from "../../../components/ButtonConfirm/ButtonConfirm";

//Others
import { useStyles } from "./styles";
import axiosClient from "../../../config/axios";
import { Link, useHistory } from "react-router-dom";
import { getTipoNormativa, deleteTipoNormativa } from '../../../services/DigestoService';

const columns = [
  { id: "codigoNormativa", label: "Codigo", minWidth: 20 },
  { id: "descripcion", label: "Descripción", minWidth: 250 },
  { id: "fechaAlta", label: "Fecha Alta", minWidth: 200 },
  { id: "horaAlta", label: "Hora Alta", minWidth: 170 },
  { id: "editar", label: "Editar", minWidth: 20 },
  { id: "eliminar", label: "Eliminar", minWidth: 20 },
];

const TiposNormativas: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [normativas, setNormativas] = useState([]);
  const [error, setError] = useState("");
  const [ errorTitle, setErrorTitle] = useState("");

  const history = useHistory();

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getNormativas = async () => {
    try {
      const result = await getTipoNormativa();
      console.log(result.data);
      setNormativas(result.data);
    } catch (e) {
      if (e.response.status === 401) { history.push('/login') }
      console.log("Ocurrio un error al traer tipo normativa", e.messageDescription);
      setError("");
    }
  };

  const deleteNormativa = async (codigoNormativa: any) => {
    try {

      const result = await deleteTipoNormativa(codigoNormativa);
      console.log(result.data);
      getNormativas();
      setError("");
    } catch (e) {
      if (e.response.status === 401) { history.push('/login') }
      const mjeErrorTitle: string = e.response.data.title;
      const msjError: string =  e.response.data.message;
      setErrorTitle(mjeErrorTitle);
      setError(msjError);
    }
  };

  useEffect(() => {
    getNormativas();
  }, []);

  return (
    <> <div>
    {error && <Alert severity="error"><AlertTitle>{ errorTitle }</AlertTitle>{ error }</Alert>}
    </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      > 
        <Title>Tipos de Normativas</Title>
        
        <Link to={`/tiponormativas/crear`} className={classes.links}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "1rem" }}
          > 
            Crear Nuevo Tipo Normativa
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
              {normativas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={data.descripcion}
                    >
                      <TableCell>{data.codigoNormativa.toUpperCase()}</TableCell>
                      <TableCell>{data.descripcion}</TableCell>
                      <TableCell>{data.fechaAlta}</TableCell>
                      <TableCell>{data.horaAlta.substr(0, 5)}</TableCell>
                      <TableCell>


                 


                        <Link
                          to={`/tiponormativas/${data.codigoNormativa}`}
                          className={classes.links}
                        >
                          <Tooltip title="Editar Tipo Normativa">
                            <ListItemIcon>
                              <EditIcon style={{ color: blue[300], cursor: 'pointer' }} />
                            </ListItemIcon></Tooltip>

                        </Link>
                      </TableCell>
                      <TableCell>

                        <ButtonConfirm
                          onConfirm={() => deleteNormativa(data.codigoNormativa)}
                          delete
                          title="Eliminar Tipo Normativa"
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
          count={normativas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TiposNormativas;
