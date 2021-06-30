import React from "react";
import { Typography, Link } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{position:'absolute', bottom:10, left:50, right:50}}>
      {"Copyright © "}
      <Link color="inherit">findSoft</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
