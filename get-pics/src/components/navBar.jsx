import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GetPicsLogo from "../getPics-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <img
            src={GetPicsLogo}
            style={{
              width: "70px",
              height: "70px"
            }}
          />
          <Typography variant="h6" color="inherit">
            GetPics- Image Searcher App
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
