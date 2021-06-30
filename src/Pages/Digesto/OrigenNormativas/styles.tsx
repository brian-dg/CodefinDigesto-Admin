import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


export  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    links:{
      textDecoration: "none",
    }

    
    
  });

  export const useStylesForm = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: theme.spacing(5),
      width: "100%",
      display:'flex',
      flexDirection:'column'
    },
    inputs: {
      width:'40%',
    },
    buttons:{
      marginRight:'1rem',
    },
    select:{
      width:'40%',
      
    }
  })
);