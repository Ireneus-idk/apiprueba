const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const apiKey = 'TU_API_KEY';
    // Aquí puedes escribir lógica para buscar la película en una base de datos o en algún otro lugar
    res.json({ id: movieId, title: 'Nombre de la película', year: 2022, director: 'Director de la película' });
});