import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ListSubheader from "@material-ui/core/ListSubheader";

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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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

export default function ImageResult(images) {
  const res = images.images;
  const classes = useStyles();
  return (
    <div className={classes.root}>
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
                >
                  <InfoIcon />
                </IconButton>
              }
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageResult.propTypes = {
  images: PropTypes.array.isRequired
};
