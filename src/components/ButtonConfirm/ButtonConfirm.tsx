import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import { ListItemIcon } from "@material-ui/core/";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { red } from '@material-ui/core/colors';

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  disabled?: boolean;
  delete?: boolean;
}

const ButtonConfirm = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = () => {
    props.onConfirm();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  return (
    <div>
      {props.delete ? (
        <Link
          onClick={handleOpen}
          style={{ marginLeft: "1rem" }}
        >
          <Tooltip title="Eliminar Archivo">
            <ListItemIcon>
              <DeleteOutlineIcon style={{ color: red[300], cursor: 'pointer' }} />
            </ListItemIcon></Tooltip>
        </Link>
      ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            disabled={props.disabled}
          >
            Guardar
          </Button>
        )}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            autoFocus
            type="submit"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ButtonConfirm;
