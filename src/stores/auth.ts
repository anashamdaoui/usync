import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { JiraUser, JiraAuthState } from '../types/jira';
import { jiraApi } from '../utils/api';

export const useAuthStore = defineStore('auth', () => {
  const state = ref<JiraAuthState>({
    isAuthenticated: false,
    currentUser: null,
    error: null
  });

  async function checkAuth() {
    try {
      const response = await jiraApi.get('/myself');
      if (response.status === 200) {
        state.value.currentUser = response.data;
        state.value.isAuthenticated = true;
        state.value.error = null;
      } else {
        state.value.isAuthenticated = false;
        state.value.currentUser = null;
      }
    } catch (error) {
      state.value.isAuthenticated = false;
      state.value.currentUser = null;
      state.value.error = 'Authentication failed';
    }
  }

  function redirectToLogin() {
    chrome.tabs.create({
      url: 'https://enreach-services.atlassian.net/login'
    });
  }

  return {
    state,
    checkAuth,
    redirectToLogin
  };
});