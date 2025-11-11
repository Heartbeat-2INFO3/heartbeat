<template>
  <div>
    <GenreButtons :genres="allGenres" :activeIds="selectedGenreIds" @toggle="onToggleGenre" />

    <div class="section-title">Séries em destaque</div>

    <section v-if="featured" class="hero">
      <div class="hero-left">
        <h1>{{ featured.name }}</h1>
        <div class="metadata">
          <span>{{ getGenresText(featured.genre_ids) }}</span>
          <span v-if="featured.episode_run_time"> - {{ featured.episode_run_time[0] || '' }}m</span>
        </div>

        <h3 class="section-subtitle">Sinopse</h3>
        <p>{{ featured.overview }}</p>
      </div>

      <div class="hero-right">
        <img :src="posterUrl(featured.poster_path)" alt="poster" />
      </div>
    </section>

    <div class="section-title">EM ALTA</div>
    <div class="grid">
      <MovieCard v-for="t in shows" :key="t.id" :item="t" type="tv" />
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
      shows: [],
      featured: null
    }
  },
  methods: {
    posterUrl(path){ return path ? this.IMG_BASE + path : '' },
    getGenresText(ids){ return (ids || []).map(i => (this.allGenres.find(g=>g.id===i)||{}).name).filter(Boolean).slice(0,3).join(' • ') },
    async fetchGenres(){
      const res = await fetch(`${this.BASE}/genre/tv/list?api_key=${this.API_KEY}&language=pt-BR`)
      const data = await res.json()
      this.allGenres = data.genres || []
    },
    async discover(){
      const genreParam = this.selectedGenreIds.join(',')
      const res = await fetch(`${this.BASE}/discover/tv?api_key=${this.API_KEY}&language=pt-BR&sort_by=popularity.desc&with_genres=${genreParam}`)
      const data = await res.json()
      this.shows = data.results || []
      if(this.shows.length) this.setFeatured(this.shows[0])
    },
    setFeatured(s){
      this.featured = s
      this.fetchDetails(s.id)
    },
    async fetchDetails(id){
      const res = await fetch(`${this.BASE}/tv/${id}?api_key=${this.API_KEY}&language=pt-BR`)
      const data = await res.json()
      this.featured = Object.assign({}, this.featured, data)
    },
    async load() {
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
    }
  },
  mounted(){ this.load() }
}
</script>
