import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';  // Importando o Slider do react-slick

const MovieCarousel = () => {
  const [moviePosters, setMoviePosters] = useState([]); // Armazena os posters dos filmes
  const [movieDetails, setMovieDetails] = useState(null); // Armazena os detalhes do filme expandido
  const [error, setError] = useState(null); // Armazena erros

  const apiKey = 'f3b7ccbf'; // Substitua pela sua chave de API
  const movieTitles = ['Dark Matter', 'Severance', 'Masters of the Air', 'Breaking Bad', 'Prison Break', 'Dexter', 'Silo']; // Exemplos de filmes
  
  useEffect(() => {
    // Função para buscar os filmes e seus posters
    const fetchMovies = async () => {
      try {
        const movieData = await Promise.all(
          movieTitles.map(async (title) => {
            const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Response === 'True') {
              return {
                title: data.Title,
                poster: data.Poster,
                description: data.Plot, // Adicionando a descrição
              };
            } else {
              return null;
            }
          })
        );
        setMoviePosters(movieData.filter(Boolean)); // Armazena os dados dos filmes
      } catch (err) {
        setError('Erro ao carregar os filmes');
      }
    };

    fetchMovies(); // Chama a função para buscar os filmes
  }, []);

  const handleMovieClick = (movie) => {
    // Quando um filme é clicado, exibe seus detalhes
    setMovieDetails(movie);
  };

  if (error) {
    return <div>{error}</div>;
  }

  // Configurações do carrossel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div>
     

      {moviePosters.length > 0 ? (
        <Slider {...settings}>
          {moviePosters.map((movie, index) => (
            <div key={index} onClick={() => handleMovieClick(movie)} style={{ cursor: 'pointer' }}>
              <img src={movie.poster} alt={movie.title} style={{ width: '290px', height: '410px' }} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Carregando carrossel...</p>
      )}

      {/* Exibe os detalhes do filme quando um filme é clicado */}
      {movieDetails && (
        <div style={{ marginTop: '20px' }}>
          <h3>{movieDetails.title}</h3>
          <img src={movieDetails.poster} alt={movieDetails.title} style={{ width: '200px', height: 'auto' }} />
          <p>{movieDetails.description}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
