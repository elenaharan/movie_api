const express = require("express"),
  morgan = require("morgan");

const app = express();

app.use(morgan("common"));
app.use(express.static("public"));

let topMovies = [
  {
    title: "Raya and the Last Dragon",
    director: ["Don Hall", "Carlos Lopez Estrada"]
  },
  {
    title: "Luca",
    director: "Enrico Casarosa"
  },
  {
    title: "Coco",
    director: "Lee Unkrich"
  },
  {
    title: "Abominable",
    director: "Jill Culton"
  },
  {
    title: "The Terminal",
    director: "Steven Spielberg"
  },
  {
    title: "The Intern",
    director: "Nancy Meyers"
  },
  {
    title: "The Holiday",
    director: "Nancy Meyers"
  },
  {
    title: "The Mauritanian",
    director: "Kevin Macdonald"
  },
  {
    title: "Eat Pray Love",
    director: "Ryan Murphy"
  },
  {
    title: "Breakfast at Tiffany's",
    director: "Blake Edwards"
  }
];

//GET Requests
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix!");
});

//handles errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listens for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
