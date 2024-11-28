<template>
  <div class="user-header" v-if="authStore.state.currentUser">
    <img 
      v-if="authStore.state.currentUser.avatarUrl"
      :src="authStore.state.currentUser.avatarUrl"
      :alt="authStore.state.currentUser.displayName"
      class="user-avatar"
    />
    <span class="user-name">{{ authStore.state.currentUser.displayName }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<style scoped>
.user-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f4f5f7;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.user-name {
  font-weight: 500;
  color: #172b4d;
}
</style>