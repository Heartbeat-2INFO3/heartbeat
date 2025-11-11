<template>
  <div>
    <div class="details-layout" v-if="details">
      <div class="details-left">
        <img :src="posterUrl(details.poster_path)" alt="poster" />
      </div>

      <div class="details-right">
        <h1>{{ details.title || details.name }}</h1>

        <div class="metadata">
          <span v-if="emAge" class="badge">{{ emAge }}</span>
          <span>{{ getGenresText() }}</span>
          <span v-if="runtime"> - {{ runtime }}</span>
        </div>

        <h3 class="section-subtitle">Sinopse</h3>
        <p>{{ details.overview }}</p>

        <div style="margin-top:18px">
          <div><strong>Avaliação:</strong> {{ details.vote_average ?? '-' }}</div>
          <div><strong>Diretor:</strong> {{ directorName || '-' }}</div>
        </div>
      </div>
    </div>

    <div class="section-subtitle">Elenco</div>
    <div class="cast-grid">
      <div v-for="c in cast" :key="c.cast_id || c.credit_id" class="cast-item">
        <img :src="castProfile(c.profile_path)" alt="actor" />
        <div style="margin-top:8px">{{ c.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type','id'],
  data() {
    return {
      API_KEY: import.meta.env.VITE_TMDB_API_KEY,
      BASE: 'https://api.themoviedb.org/3',
      IMG_BASE: 'https://image.tmdb.org/t/p/w500',
      details: null,
      cast: [],
      directorName: null
    }
  },
  computed: {
    posterUrl(){ return path => path ? this.IMG_BASE + path : '' },
    runtime(){ return this.details ? (this.details.runtime ? `${this.details.runtime} min` : (this.details.episode_run_time && this.details.episode_run_time[0] ? `${this.details.episode_run_time[0]} min` : '')) : '' },
    emAge(){ return this.details && this.details.adult ? '18+' : '' }
  },
  methods: {
    posterUrl(path){ return path ? this.IMG_BASE + path : '' },
    castProfile(path){ return path ? this.IMG_BASE + path : '' },
    getGenresText(){ return (this.details && this.details.genres ? this.details.genres.map(g=>g.name).slice(0,3).join(' • ') : '') },
    async loadDetails(){
      const endpoint = this.type === 'tv' ? 'tv' : 'movie'
      const res = await fetch(`${this.BASE}/${endpoint}/${this.id}?api_key=${this.API_KEY}&language=pt-BR`)
      const data = await res.json()
      this.details = data
    },
    async loadCredits(){
      const endpoint = this.type === 'tv' ? 'tv' : 'movie'
      const res = await fetch(`${this.BASE}/${endpoint}/${this.id}/credits?api_key=${this.API_KEY}&language=pt-BR`)
      const data = await res.json()
      this.cast = (data.cast || []).slice(0,10)
      if (data.crew) {
        const dir = data.crew.find(c => c.job === 'Director')
        if (dir) this.directorName = dir.name
      } else if (this.details && this.details.created_by && this.details.created_by.length) {
        this.directorName = this.details.created_by.map(c=>c.name).join(', ')
      }
    }
  },
  async mounted(){
    await this.loadDetails()
    await this.loadCredits()
    window.scrollTo({ top: 0 })
  }
}
</script>
