<template>
  <button 
    class="login-button"
    @click="authStore.redirectToLogin"
  >
    Login with Jira
  </button>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<style scoped>
.login-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: #0747a6;
}
</style>