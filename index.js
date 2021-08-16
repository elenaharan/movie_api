const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser");

const path = require("path");
const port = process.env.PORT || 8080;

const app = express();

app.use(morgan("common"));
app.use(express.static("public"));

let topMovies = [
  {
    title: "Raya and the Last Dragon",
    director: ["Don Hall", "Carlos Lopez Estrada"],
  },
  {
    title: "Luca",
    director: "Enrico Casarosa",
  },
  {
    title: "Coco",
    director: "Lee Unkrich",
  },
  {
    title: "Abominable",
    director: "Jill Culton",
  },
  {
    title: "The Terminal",
    director: "Steven Spielberg",
  },
  {
    title: "The Intern",
    director: "Nancy Meyers",
  },
  {
    title: "The Holiday",
    director: "Nancy Meyers",
  },
  {
    title: "The Mauritanian",
    director: "Kevin Macdonald",
  },
  {
    title: "Eat Pray Love",
    director: "Ryan Murphy",
  },
  {
    title: "Breakfast at Tiffany's",
    director: "Blake Edwards",
  },
];

//GET Requests
app.get("/movies", (req, res) => {
  res.send("Successful GET request returning data on all the movies");
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request returning data about a single movie");
});

app.get("/genres/:name", (req, res) => {
  res.send("Successful GET request returns data about a genre");
});

app.get("/directors/:name", (req, res) => {
  res.send("Successful GET request returns data about a movie director");
});

app.post("/users", (req, res) => {
  res.send("Successful POST request will add a new user to database");
  res.end();
});

app.delete("/users/:username", (req, res) => {
  res.send("Successful DELETE request will allow users to deregister");
});

app.patch("users/:username", (req, res) => {
  res.send("Successful Patch request will allow users update their info");
});

//handles errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//serves static file
app.use("/index", express.static(path.join(__dirname, "public")));

//listens for requests
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
