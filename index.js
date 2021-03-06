const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  morgan = require("morgan");

const { check, validationResult } = require("express-validator");

const mongoose = require("mongoose");
const Models = require("./database/models");
const app = express();

const Movies = Models.Movie;
const Users = Models.User;

/*mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewURLParser: true, useUnifiedTopology: true});*/

mongoose.connect(process.env.CONNECTION_URI, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

let auth = require("./middleware/auth")(app);
const passport = require("passport");
require("./helpers/passport");

const path = require("path");
const port = process.env.PORT || 8080;

app.use(morgan("common"));
app.use(express.static("public"));


/**
 * The following are API requests containing API endpoint
 */

/**
 * Returns all movies to the user
 * Endpoint url/movies
 * @method GET
 * @returns an array of all movies from the DB
 */
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    Movies.find()
      .then(function (movies) {
        res.status(200).json(movies);
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * Returns all users from the DB
 * Endpoint url/users
 * @method GET
 * @returns array of all users in the DB
 */
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * Returns info about a single user
 * Endpoint url/users/profile/username
 * @method GET
 * @returns {object} returns data on a specific user
 */
app.get(
  "/users/profile/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params, "profile request");
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * Returns a single movie by title
 * Endpoint url/movies/:Title
 * @method GET
 * @returns {object} - returns a single movie
 * @param {string} - title of a movie
 */
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params, "movie request");
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * Returns info about a genre by its name
 * Endpoint url/genres/:genre
 * @method GET
 * @param {string} Name - name of a specific genre
 * @returns {object} returns info about genre's name and description
 * 
 */
app.get(
  "/genres/:genre",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.genre })
      .then((genre) => {
        res.json(genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * Returns data about a director by name
 * Endpoint url/directors/:Name
 * @method GET
 * @param {string} Name - name of a director
 * @returns {object} - info on a specific director (name, bio)
 */
app.get(
  "/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((director) => {
        res.status(200).json(director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * This function allows new users to register
 * Endpoint url/users
 * @method POST
 * @param {string} Username 
 * @param {string} Password
 * @param {string} Email
 * @returns {object} new user
 * 
 */
app.post(
  "/users",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(409).send(req.body.Username + " already exists");
        } else {
          console.log("request", req.body);
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(200).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);


/**
 * Updates user info
 * Endpoint url/users/update
 * @method PUT 
 * @param Username, Password, Email, Birthday
 */
app.put(
  "/users/update/:user",
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    /*check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),*/
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);


/**
 * Adds a movie to a user's list of favorites
 * Endpoint url/users/:username/movies/:movieId
 * @method POST 
 * @param {string} User's username
 * @param movie {string} id
 * @returns {string} success/error message
 */
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieID } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);


/**
 * Removes a movie from user's list of favorites
 * Endpoint url/users/:Username/movies/:movieId
 * @method DELETE 
 * @param {string} user's username
 * @param {string} movie id
 * @returns {string} success/error message
 */
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);


/**
 * Allows existing users to deregister
 * Endpoint url/users/:username
 * @method DELETE 
 * @param {string} username 
 * @returns {string} error/success message
 */
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(404).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);


/**
 * Returns welcome page
 * Endpoint url/home
 * @method GET
 * @returns {object} returns welcome page
 */
app.get("/home", (req, res) => {
  res.send("Welcome to my movie API!");
});


/**
 *serves static file 
 */
app.use("/index", express.static(path.join(__dirname, "public")));


/**
 * Error-Handling
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
});


/**
 *listens for requests 
 */
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
