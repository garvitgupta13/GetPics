import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450,
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageResult(images) {
  const [open, setOpen] = useState(false);
  const [currImg, setCurrImg] = useState("");
  const res = images.images;
  const classes = useStyles();

  const handleClickOpen = (image) => {
    setOpen(true);
    setCurrImg(image);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrImg("");
  };

  return (
    <div className={classes.root}>
      {/* Image Component */}
      <GridList cols={3}>
        {res.map((image) => (
          <GridListTile key={image.id}>
            <img src={image.largeImageURL} alt={image.tags} />
            <GridListTileBar
              title={image.tags}
              subtitle={<span>by: {image.user}</span>}
              titlePosition="top"
              actionIcon={
                <IconButton
                  aria-label={`info about ${image.tags}`}
                  className={classes.icon}
                  onClick={() => handleClickOpen(image)}
                >
                  <ZoomInIcon />
                </IconButton>
              }
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>

      {/* Dialog Box */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <img
            src={currImg.largeImageURL}
            alt={currImg.tags}
            style={{ width: "100%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ImageResult.propTypes = {
  images: PropTypes.array.isRequired
};
