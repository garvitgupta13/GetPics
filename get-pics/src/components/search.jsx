import React, { useEffect, useState } from "react";
import ImageResult from "./imageResults";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Cameraman from "../cameraman.png";
import "../App.css";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState("all");
  const [images, setImages] = useState([]);
  const [amount, setAmount] = useState(10);
  const apiURL = "https://pixabay.com/api/";
  const key = process.env.REACT_APP_PIXABAY_API_KEY;
  const categories = [
    { value: "all", label: "All" },
    { value: "photo", label: "Photo" },
    { value: "illustration", label: "Illustration" },
    { value: "vector", label: "Vector" }
  ];

  useEffect(() => {
    document.title = `Get Pics - ${searchQuery}`;
    if (searchQuery == 0) {
      setImages([]);
    } else {
      axios
        .get(
          `${apiURL}?key=${key}&q=${searchQuery}&image_type=${type}&per_page=${amount}&pretty=true`
        )
        .then((response) => setImages(response.data.hits))
        .catch((err) => console.log(err));
    }
  }, [searchQuery, amount, type]);

  // console.log(
  //   `https://pixabay.com/api/?key=${key}&q=${searchQuery}&image_type=${type}&per_page=${amount}&pretty=true`
  // );
  // console.log(images);

  return (
    <div>
      <div className="searchBar">
        <TextField
          id="outlined-basic"
          label="Search your Query..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.currentTarget.value);
          }}
          style={{
            width: "50%",
            marginRight: "10px",
            marginLeft: "20px"
          }}
        />
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          helperText="Min:3 Max:200"
          value={amount}
          onChange={(e) => {
            setAmount(e.currentTarget.value);
          }}
          style={{
            marginRight: "10px"
          }}
        />

        <FormControl
          variant="outlined"
          style={{
            width: "200px"
          }}
        >
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={type}
            onChange={(e, index) => setType(index.props.value)}
            label="type"
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {images.length > 0 ? (
        <ImageResult images={images} />
      ) : (
        <center>
          <img
            src={Cameraman}
            style={{
              width: "700px",
              height: "500px",
              marginTop: "0",
              paddingTop: "0"
            }}
          />
        </center>
      )}
    </div>
  );
}
