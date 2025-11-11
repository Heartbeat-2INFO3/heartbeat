<template>
  <div>
    <header class="topbar">
      <div class="brand">
        <img src="/public/img/logo.png" alt="logo">
      </div>
      <div class="search">
        <input v-model="query" @keyup.enter="onSearch" placeholder="Buscar" />
      </div>
    </header>

    <nav class="navline">
      <router-link to="/" class="navlink">Filmes</router-link>
      <router-link to="/series" class="navlink">Séries</router-link>
    </nav>

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
  background: #ffd7e6;
  padding: 18px 28px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.03)
}

.brand {
  font-weight: 700;
  font-size: 22px
}

.brand .heart {
  color: #ff5d9e;
  margin: 0 6px
}

.search input {
  width: 360px;
  padding: 10px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  
}

.profile {
  font-size: 20px;
  cursor: pointer
}

.navline {
  max-width: 1100px;
  margin: 8px auto;
  padding: 0 24px;
  display: flex;
  gap: 12px
}

.navlink {
  padding: 6px 12px;
  border-radius: 14px;
  border-bottom: 2px solid transparent;
  text-decoration: none;
  color: #333
}

.navlink.router-link-active {
  border-bottom-color: #ff5d9e
}

@media(max-width:900px) {
  .search input {
    width: 160px
  }
}
</style>
