# movie_api
This is a web application that provides users with access to information about movies, directors, and genres. Users are able to sign up, update their personal information, and create a list of their favourite movies. 

## Technologies
This web application is built using MERN tech stack (MongoDB, Express, React, and Node.js). The API created for this web application is a REST(ful) API, and it is accessed via HTTP methods like GET and POST.

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
