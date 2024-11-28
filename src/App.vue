<template>
  <div class="app-container">
    <header class="app-header">
      <h1>USync</h1>
    </header>
    <main class="app-content">
      <template v-if="authStore.state.isAuthenticated">
        <user-header />
        <contact-search />
      </template>
      <login-button v-else />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';
import UserHeader from './components/UserHeader.vue';
import ContactSearch from './components/ContactSearch.vue';
import LoginButton from './components/LoginButton.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.checkAuth();
});
</script>

<style scoped>
.app-container {
  width: 400px;
  min-height: 500px;
  padding: 1rem;
}

.app-header {
  padding: 1rem;
  background-color: #0052cc;
  color: white;
  text-align: center;
  border-radius: 8px 8px 0 0;
}

.app-content {
  padding: 1rem;
  background-color: white;
  border-radius: 0 0 8px 8px;
}
</style>