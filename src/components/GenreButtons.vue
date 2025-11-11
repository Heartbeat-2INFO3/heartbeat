<template>
  <div class="genres">
    <button
      v-for="g in genres"
      :key="g.id"
      :class="['genre-btn', { active: activeIds.includes(g.id) }]"
      @click="toggle(g.id)"
    >{{ g.name }}</button>
  </div>
</template>

<script>
export default {
  props: {
    genres: { type: Array, required: true },
    activeIds: { type: Array, required: true }
  },
  methods: {
    toggle(id) {
      this.$emit('toggle', id)
    }
  }
}
</script>
