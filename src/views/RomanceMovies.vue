<template>
    <div class="app-container">
      <header class="header">
        <h1 class="logo">
          <img src="/public/img/logocoracao.png" alt="logo">
          <p>Heartbeat</p>
        </h1>
        <nav class="genres-bar">
          <button
            v-for="genre in genreOptions"
            :key="genre.id"
            class="genre-btn"
            @click="fetchMovies(genre.id)"
          >
            {{ genre.name }}
          </button>
        </nav>
      </header>
  
      <main class="main-section">
        <div class="carousel-wrapper">
          <button class="nav-btn left" @click="prevMovie">‹</button>
  
          <div class="movie-display" v-if="currentMovie">
            <div class="poster-wrapper">
              <img
                :src="getImageUrl(currentMovie.poster_path)"
                :alt="currentMovie.title"
                class="poster"
              />
            </div>
  
            <div class="info-wrapper">
              <h2 class="movie-title">{{ currentMovie.title }}</h2>
              <p class="movie-description">{{ currentMovie.overview }}</p>
              <div class="genres">
                <span
                  v-for="genre in currentMovie.genre_ids"
                  :key="genre"
                  class="genre-badge"
                >
                  {{ getGenreName(genre) }}
                </span>
              </div>
            </div>
          </div>
  
          <button class="nav-btn right" @click="nextMovie">›</button>
        </div>
  
        <div class="dots">
          <span
            v-for="(movie, index) in movies"
            :key="movie.id"
            :class="{ active: index === currentIndex }"
            class="dot"
            @click="goToMovie(index)"
          ></span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "RomanceApp",
    data() {
      return {
        movies: [],
        currentIndex: 0,
        genreOptions: [
          { id: 18, name: "Drama" },
          { id: 35, name: "Comédia" },
          { id: 53, name: "Suspense" },
          { id: 36, name: "Histórico" },
          { id: 27, name: "Paranormal" },
          { id: 14, name: "Fantasia" },
          { id: 10749, name: "Romance" },
          { id: 99, name: "Fatos Reais" },
        ],
        genres: {
          10749: "Romance",
          35: "Comédia",
          18: "Drama",
          36: "Histórico",
          27: "Paranormal",
          14: "Fantasia",
          99: "Fatos Reais",
          53: "Suspense",
        },
      };
    },
    computed: {
      currentMovie() {
        return this.movies[this.currentIndex] || null;
      },
    },
    mounted() {
      this.fetchMovies(10749);
    },
    methods: {
      async fetchMovies(genreId) {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR&page=1&include_adult=false`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          this.movies = data.results;
          this.currentIndex = 0;
        } catch (error) {
          console.error("Erro ao carregar filmes:", error);
        }
      },
      getImageUrl(path) {
        return `https://image.tmdb.org/t/p/w500${path}`;
      },
      nextMovie() {
        this.currentIndex = (this.currentIndex + 1) % this.movies.length;
      },
      prevMovie() {
        this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
      },
      goToMovie(index) {
        this.currentIndex = index;
      },
      getGenreName(id) {
        return this.genres[id] || "";
      },
    },
  };
  </script>
  
  <style scoped>
  .app-container {
    background-color: #f8d8e7;
    color: #4a0038;
    font-family: 'Poppins', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    background-color: #d88ab7;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    font-size: 2rem;
    color: white;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .genres-bar {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  
  .genre-btn {
    background-color: #f6e5ec;
    border: 2px solid #b34b8c;
    border-radius: 25px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 1rem;
  }
  
  .genre-btn:hover {
    background-color: #b34b8c;
    color: white;
  }
  
  .main-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
    margin-top: 40px;
  }
  
  .carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
  }
  
  .movie-display {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f6e5ec;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 80%;
    padding: 20px;
    gap: 30px;
  }
  
  .poster-wrapper {
    flex: 1;
  }
  
  .poster {
    width: 100%;
    max-width: 350px;
    border-radius: 10px;
  }
  
  .info-wrapper {
    flex: 1;
    text-align: left;
  }
  
  .movie-title {
    color: #8b0055;
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .movie-description {
    color: #4a0038;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  .genre-badge {
    display: inline-block;
    background-color: #d88ab7;
    color: white;
    border-radius: 15px;
    padding: 5px 12px;
    margin: 5px 5px 0 0;
    font-size: 0.9rem;
  }
  
  .nav-btn {
    background: none;
    border: none;
    font-size: 3rem;
    color: #8b0055;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .nav-btn:hover {
    color: #b34b8c;
  }
  
  .dots {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  
  .dot {
    height: 12px;
    width: 12px;
    background-color: #d88ab7;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;
  }
  
  .dot.active {
    opacity: 1;
    background-color: #8b0055;
  }
  
  /* Layout fixado em formato desktop */
  @media (min-width: 769px) {
    .movie-display {
      flex-direction: row;
    }
  }
  
  /* Ajustes responsivos */
  @media (max-width: 768px) {
    .movie-display {
      flex-direction: column;
      width: 95%;
    }
    .poster {
      max-width: 300px;
    }
    .movie-title {
      font-size: 1.5rem;
    }
    .movie-description {
      font-size: 0.95rem;
    }
  }
  </style>