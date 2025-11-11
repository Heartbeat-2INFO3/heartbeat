<template>
  <div class="card" @click="open">
    <img :src="posterUrl" :alt="title" />
    <div class="card-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    type: { type: String, default: 'movie' } 
  },
  computed: {
    title() {
      return this.item.title || this.item.name
    },
    posterUrl() {
      return this.item.poster_path ? `https://image.tmdb.org/t/p/w500${this.item.poster_path}` : ''
    }
  },
  methods: {
    open() {
      this.$router.push({ name: 'Details', params: { type: this.type, id: this.item.id } })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
