<template>
  <div>
    <header class="topbar">
      <div class="brand">
        <img src="/public/img/logo.png" alt="logo">
      </div>
      <div class="search">
        <input v-model="query" @keyup.enter="onSearch" placeholder="Buscar..." />
      </div>
      <nav class="navline">
        <router-link to="/" class="navlink">Filmes</router-link>
        <router-link to="/series" class="navlink">Séries</router-link>
      </nav>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    onSearch() {
      if (!this.query.trim()) return
      const path = window.location.pathname.includes('/series') ? '/series' : '/'
      this.$router.push({ path, query: { q: this.query } })
    },
    gotoProfile() {
      alert('Perfil (a implementar)')
    }
  }
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffd7e6;
  padding: 1vw 6vw;
  border-bottom: 2px solid rgba(0, 0, 0, 0.03)
}

.search input {
  width: 18vw;
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  outline: none;
}

.profile {
  font-size: 20px;
  cursor: pointer
}

.navlink {
  padding: 5px 14px;
  border-radius: 20px;
  background: #fff;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  color: #292929;
  margin: 0 5px;
}

.navlink.router-link-active {
  border: 2px solid #ffb3d1;
}

@media(max-width:900px) {
  .search input {
    width: 160px
  }
}
</style>
