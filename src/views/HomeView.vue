<template>
  <div>
    <GenreButtons :genres="allGenres" :activeIds="selectedGenreIds" @toggle="onToggleGenre" />

    <section class="hero" v-if="featured">
      <div class="hero-left">
        <h1>{{ featured.title }}</h1>
        <div class="metadata">
          <span class="badge">{{ getRating(featured.vote_average) }}</span>
          <span>{{ getGenresText(featured.genre_ids) }}</span>
          <span v-if="featured.runtime"> - {{ featured.runtime }}m</span>
        </div>

        <h3 class="section-subtitle">Sinopse</h3>
        <p>{{ featured.overview }}</p>

      </div>

      <div class="hero-right">
        <img :src="posterUrl(featured.poster_path)" alt="poster" />
      </div>
    </section>

    <hr class="separator" />

    <div class="section-title">EM ALTA</div>
    <div class="grid">
      <MovieCard v-for="m in movies" :key="m.id" :item="m" type="movie" />
    </div>
  </div>
</template>

<script>
import GenreButtons from '../components/GenreButtons.vue'
import MovieCard from '../components/MovieCard.vue'

export default {
  components: { GenreButtons, MovieCard },
  data() {
    return {
      API_KEY: import.meta.env.VITE_TMDB_API_KEY,
      BASE: 'https://api.themoviedb.org/3',
      IMG_BASE: 'https://image.tmdb.org/t/p/w500',
      allGenres: [],
      selectedGenreIds: [10749], 
      movies: [],
      featured: null
    }
  },
  watch: {
    '$route.query.q': {
      handler(n) {
        if (n) this.search(n)
        else this.loadMovies()
      },
      immediate: true
    }
  },
  methods: {
    posterUrl(path){ return path ? this.IMG_BASE + path : '' },
    getRating(v){ return v ? v.toFixed(1) : '-' },
    getGenresText(ids){
      return (ids || []).map(i => (this.allGenres.find(g=>g.id===i)||{}).name).filter(Boolean).slice(0,3).join(' • ')
    },
    async fetchGenres(){
      const res = await fetch(`${this.BASE}/genre/movie/list?api_key=${this.API_KEY}&language=pt-BR`)
      const data = await res.json()
      this.allGenres = data.genres || []
    },
    async discover(){
      const genreParam = this.selectedGenreIds.join(',')
      const res = await fetch(`${this.BASE}/discover/movie?api_key=${this.API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${genreParam}`)
      const data = await res.json()
      this.movies = data.results || []
      if(this.movies.length) this.setFeatured(this.movies[0])
    },
    setFeatured(m){
      this.featured = m
      this.fetchMovieDetails(m.id)
    },
    async fetchMovieDetails(id){
      const res = await fetch(`${this.BASE}/movie/${id}?api_key=${this.API_KEY}&language=pt-BR`)
      const data = await res.json()
      this.featured = Object.assign({}, this.featured, data)
    },
    async loadMovies(){
      if(!this.allGenres.length) await this.fetchGenres()
      await this.discover()
    },
    async onToggleGenre(id){
      if (id === 10749 && this.selectedGenreIds.includes(10749)) {
        return
      }
      const idx = this.selectedGenreIds.indexOf(id)
      if (idx > -1) this.selectedGenreIds.splice(idx, 1)
      else this.selectedGenreIds.push(id)
      await this.discover()
    },
    async search(q){
      const res = await fetch(`${this.BASE}/search/movie?api_key=${this.API_KEY}&language=pt-BR&query=${encodeURIComponent(q)}`)
      const data = await res.json()
      const results = (data.results || []).filter(m => (m.genre_ids || []).includes(10749))
      this.movies = results
      if(this.movies.length) this.setFeatured(this.movies[0])
    }
  },
  mounted(){
    this.loadMovies()
  }
}
</script>
