import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';  // Importando o Slider do react-slick

const showCarousel2 = () => {
  const [moviePosters, setMoviePosters] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = 'f3b7ccbf'; // Substitua pela sua chave de API
  const movieTitles = ['The last of us', 'The office', 'How i met your mother', 'Stranger Things', 'Mr robot', 'Cobra kai','The crown']; // Exemplos de filmes
  
  useEffect(() => {
    // Função para buscar os filmes e seus posters
    const fetchMovies = async () => {
      try {
        const posters = await Promise.all(
          movieTitles.map(async (title) => {
            const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
            const data = await response.json();
            if (data.Response === 'True') {
              return data.Poster; // Retorna a URL do poster
            } else {
              return null;
            }
          })
        );
        setMoviePosters(posters.filter(Boolean)); // Armazena os posters não nulos
      } catch (err) {
        setError('Erro ao carregar os filmes');
      }
    };

    fetchMovies(); // Chama a função para buscar os filmes
  }, []);

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
          {moviePosters.map((poster, index) => (
            <div key={index}>
              <img src={poster} alt={`Poster ${index}`} style={{ width: '290px', height: '410px' }} />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Carregando carrossel...</p>
      )}
    </div>
  );
};

export default showCarousel2;
