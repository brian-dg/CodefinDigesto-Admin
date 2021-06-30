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
import { TextField } from "@material-ui/core/";

//Our Components
import Title from "../../components/Title";
import ButtonConfirm from "../../components/ButtonConfirm/ButtonConfirm";

//Others
import { useStyles } from "./styles";
import axiosClient from "../../config/axios";
import { Link, useHistory } from "react-router-dom";


const columns = [
  { id: "id", label: "ID", minWidth: 20 },
  { id: "nombre", label: "Nombre", minWidth: 150 },
  { id: "apellido", label: "Apellido", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
  },
  {
    id: "createdAt",
    label: "Fecha Creacion",
    minWidth: 170,
  },
  {
    id: "rol",
    label: "Rol",
    minWidth: 170,
  },
  {
    id: "acciones",
    label: "Acciones",
    minWidth: 170,
  },
];

interface User {
  nombre: string;
  apellido: string;
  email: string;
  createdAt: string;
  rol: number;
}

const Usuarios: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const history = useHistory();

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUsers = async () => {
    try {
      const result = await axiosClient.get("users");
      setUsuarios(result.data);
      setSearchResult(result.data)
    } catch (e) {
      if(e.response.status === 401){history.push('/login')}
      console.log("Ocurrio un error al traer usuarios", e);
    }
  };

  const deleteUser = async (id: any) => {
    try {
      const result = await axiosClient.delete(`users/${id}`);
      console.log(result.data);
      getUsers();
    } catch (e) {
      if(e.response.status === 401){history.push('/login')}
      console.log("Ocurrio un error al Eliminar usuarios", e);
    }
  };


  const searchUsuarios = () => {
    const result = usuarios.filter(
      (user) => user.nombre.toUpperCase().includes(search.toUpperCase())
    );
    if (result.length > 0) {
      setSearchResult(result);
    }
    if(search.length < 1 ) {setSearchResult(usuarios)}
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem",
        }}
      >
        <div>
          <Title>Usuarios</Title>

          <TextField
            id="standard-basic"
            label="Buscar"
            value={search}
            onChange={ e => setSearch(e.target.value)}
            onKeyUp={searchUsuarios}
          />
        </div>
        <Link to={`/usuarios/crear`} className={classes.links}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "1rem" }}
          >
            Crear Nuevo Usuario
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
                .map((data: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={data.nombre}
                    >
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.nombre}</TableCell>
                      <TableCell>{data.apellido}</TableCell>
                      <TableCell>{data.email}</TableCell>
                      <TableCell>{data.createdAt}</TableCell>
                      <TableCell>{data.rol?.nombre}</TableCell>
                      <TableCell style={{ display: "flex" }}>
                        <Link
                          to={`/usuarios/${data.id}`}
                          className={classes.links}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginRight: "1rem" }}
                          >
                            Editar
                          </Button>
                        </Link>

                        <ButtonConfirm
                          onConfirm={() => deleteUser(data.id)}
                          delete
                          title="Eliminar usuario"
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
          count={usuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Usuarios;
