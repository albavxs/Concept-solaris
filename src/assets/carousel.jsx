import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Importando o Slider do react-slick

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
    // Exibe os detalhes do filme ao clicar no poster
    setMovieDetails(movie);
  };

  const closeCard = () => {
    // Fecha o card ao clicar fora ou em um botão
    setMovieDetails(null);
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
    <div style={{ position: 'relative' }}>
      {moviePosters.length > 0 ? (
        <Slider {...settings}>
          {moviePosters.map((movie, index) => (
            <div
              key={index}
              onClick={() => handleMovieClick(movie)}
              style={{ cursor: 'pointer' }}
            >
              <img src={movie.poster} alt={movie.title} style={{ width: '290px', height: '410px' }} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Carregando carrossel...</p>
      )}

      {/* Exibe os detalhes do filme quando um filme é clicado */}
      {movieDetails && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#20272F',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            height: '700px',
            zIndex: 1000,
            width: '75%',
            
          }}
        >
          <div>
          <img
            src={movieDetails.poster}
            alt={movieDetails.title}
            style={{ width: '350px', height: '450px', marginTop: '32px', marginLeft: '-1305px' }}
          />
          </div>
          <p
          
          style={{marginTop: '-315px', position: 'absolute', right: '135px', fontSize: '30px', width: '1150px', textAlign: 'left' }}
          >{movieDetails.description}</p>
          <div>
          <button
            onClick={closeCard}
            style={{
              marginTop: '-295px',
              marginLeft: '685px',
              padding: '8px 10px',
              fontSize: '20px',
              backgroundColor: '#20272F',
              color: '#eee',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Fechar
          </button>
          </div>
        </div>
      )}

      {/* Fundo escurecido para destacar o card */}
      {movieDetails && (
        <div
          onClick={closeCard}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default MovieCarousel;
