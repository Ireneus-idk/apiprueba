/* Cartelera de Cine */

/*Con esta api podemos probar en Thunder Client las operaciones CRUD*/
//Como Put Get Post y Delete
//Desde el navegador podemos visualizar la cartelera mediante el localhost

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("views"))
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './views');

let movies = [
    { id: 1, title: 'Pelicula 1', director: 'Director 1' },
    { id: 2, title: 'Pelicula 2', director: 'Director 2' },
    { id: 3, title: 'Pelicula 3', director: 'Director 3' }
];
app.get('/', (req, res) => {
    res.render('index',{movies:movies});
}); 

// GET all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// GET movie by ID
app.get('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
});

// POST a new movie
app.post('/movies', (req, res) => {
    const { title, director } = req.body;
    const newMovie = { id: movies.length + 1, title, director };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PUT update a movie
app.put('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const { title, director } = req.body;
    const index = movies.findIndex(movie => movie.id === movieId);
    if (index === -1) return res.status(404).json({ message: 'Movie not found' });
    movies[index] = { id: movieId, title, director };
    res.json(movies[index]);
});

// DELETE a movie
app.delete('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    movies = movies.filter(movie => movie.id !== movieId);
    res.json({ message: 'Movie deleted' });
});
app.get('/', (req, res) => {
    res.render('index');
}); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});