import React, { useState } from 'react';

// Composant pour afficher une carte de film
function MovieCard({ movie }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 15, marginBottom: 10, borderRadius: 8 }}>
      <img src={movie.posterURL} alt={movie.title} style={{ width: 150, height: 220, objectFit: 'cover' }} />
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Note : {movie.rating} / 5</p>
    </div>
  );
}

// Composant pour afficher la liste des films
function MovieList({ movies }) {
  if (movies.length === 0) return <p>Aucun film trouvé.</p>;

  return (
    <div>
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

// Composant pour filtrer les films
function Filter({ onFilter }) {
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);

  function handleFilter() {
    onFilter(titleFilter, ratingFilter);
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Filtrer par titre"
        value={titleFilter}
        onChange={(e) => setTitleFilter(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        min="0"
        max="5"
        placeholder="Note minimale"
        value={ratingFilter}
        onChange={(e) => setRatingFilter(Number(e.target.value))}
        style={{ marginRight: 10, width: 120 }}
      />
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
}

// Composant pour ajouter un nouveau film
function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const [rating, setRating] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description || !posterURL || rating <= 0 || rating > 5) {
      alert('Veuillez remplir tous les champs correctement (note entre 1 et 5).');
      return;
    }

    const newMovie = { title, description, posterURL, rating };
    onAdd(newMovie);

    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setPosterURL('');
    setRating(0);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 30, marginBottom: 30 }}>
      <h2>Ajouter un nouveau film</h2>
      <div>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '300px', marginBottom: 10 }}
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ width: '300px', marginBottom: 10 }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="URL de l'affiche"
          value={posterURL}
          onChange={(e) => setPosterURL(e.target.value)}
          style={{ width: '300px', marginBottom: 10 }}
        />
      </div>
      <div>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Note (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ width: '100px', marginBottom: 10 }}
        />
      </div>
      <button type="submit">Ajouter le film</button>
    </form>
  );
}

// Composant principal
function App() {
  const [movies, setMovies] = useState([
    {
      title: 'Inception',
      description: 'Un voleur qui dérobe des secrets en infiltrant les rêves.',
      posterURL: 'https://m.media-amazon.com/images/I/51s+J0-+v7L._AC_.jpg',
      rating: 5,
    },
    {
      title: 'Interstellar',
      description: 'Des explorateurs voyagent à travers un trou de ver dans l\'espace.',
      posterURL: 'https://m.media-amazon.com/images/I/71yCkG9Z6SL._AC_SY679_.jpg',
      rating: 4,
    },
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  function handleFilter(title, rating) {
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase()) &&
        movie.rating >= rating
    );
    setFilteredMovies(filtered);
  }

  function handleAddMovie(newMovie) {
    const newList = [...movies, newMovie];
    setMovies(newList);
    setFilteredMovies(newList);
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Ma liste de films</h1>
      <Filter onFilter={handleFilter} />
      <MovieList movies={filteredMovies} />
      <AddMovieForm onAdd={handleAddMovie} />
    </div>
  );
}

export default App;
