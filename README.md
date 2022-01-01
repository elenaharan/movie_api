# movie_api
This is a web application that provides users with access to information about movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favorite movies. 

![LiveDemo](https://github.com/elenaharan/movie_api/blob/main/demo/movie-apiLiveDemo.gif)

## Technologies
This web application is built using MERN tech stack: <br>
<ul>
<li>MongoDB</li>
<li>Express</li>
<li>React</li>
<li>Node.js</li>
</ul> 
<p>The API created for this web application is a REST(ful) API, and it is accessed via HTTP methods like GET and POST.</p>
## Feature Requirements
<ul>
<li>Return a list of all movies to the user</li>
<li>Return data about a single movie such as movie description, genre, director, image URL</li>
<li>Return data about a genre by name (i.e., Comedy)</li>
<li>Return data about a director (name and bio)</li>
<li>Allow new users to register</li>
<li>Allow users to update their user info</li>
<li>Allow users to add a movie to their list of favorite movies</li>
<li>Allow users to remove a movie from their list of favorites</li>
<li>Allow existing users to deregister</li>
</ul>

## Technical Requirements
### The API:
<ul>
<li>must be a Node.js and Express application</li>
<li>must use REST API architecture</li>
<li>must use at least three middleware modules, such as the body-parser package for reading data and morgan for logging</li>
<li>must provide movie info in JSON format</li>
<li>must be tested in Postman</li>
<li>must include user authentication and authorization code</li>
<li>must include data validation logic</li>
<li>must meet data security regulations</li>
<li>must be deployed to Heroku</li>
<li>The database must be built using MongoDB</li>
<li>The business logic must be modeled with Mongoose</li>
</ul>

## API Endpoints
<table>
    <thead>
      <tr>
        <th>Business Logic</th>
        <th>URL</th>
        <th>HTTP Method</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Return a list of movies</td>
        <td>/movies</td>
        <td>GET</td>
      </tr>
      <tr>
        <td>Return data about single movie by title</td>
        <td>/movies/:Title</td>
        <td>GET</td>
      </tr>
      <tr>
       <td>Return data about a genre by title (e.g., "Comedy")</td>
       <td>/genres/:genre</td>
       <td>GET</td>
      </tr>
      <tr>
        <td>Return data about a movie director by name</td>
        <td>/directors/:Name</td>
        <td>GET</td>
      </tr>
      <tr>
        <td>Allow new users to register</td>
        <td>/users</td>
        <td>POST</td>
      </tr>
      <tr>
        <td>Allow existing users to update their information</td>
        <td>users/update/:Username</td>
        <td>PUT</td>
      </tr>
      <tr>
        <td>Allow users to add a movie to their list of "Favourites"</td>
        <td>/users/:Username/movies/:MovieID</td>
        <td>POST</td>
      </tr>
      <tr>
        <td>Remove a movie from "Favourites"</td>
        <td>/users/:Username/movies/:MovieID</td>
        <td>DELETE</td>
      </tr>
      <tr>
        <td>Allow users to deregister</td>
        <td>/users/:Username</td>
        <td>DELETE</td>
      </tr>
    </tbody>
</table>
