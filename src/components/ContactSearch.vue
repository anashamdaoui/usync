<template>
  <div class="contact-search">
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search contacts..."
        class="search-input"
        :disabled="!authStore.state.isAuthenticated"
      />
      <button 
        class="call-button"
        :disabled="!selectedContact"
        @click="handleCall"
      >
        Call
      </button>
    </div>
    
    <div class="search-results" v-if="authStore.state.isAuthenticated">
      <div v-if="contactsStore.isLoading" class="loading">
        Fetching contacts, please wait...
      </div>
      <div v-else-if="searchResults.length > 0" class="results-list">
        <div
          v-for="contact in searchResults"
          :key="contact.accountId"
          class="contact-item"
          :class="{ selected: selectedContact?.accountId === contact.accountId }"
          @click="selectContact(contact)"
        >
          <span class="contact-name">{{ contact.displayName }}</span>
          <span class="contact-email">{{ contact.emailAddress }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useContactsStore } from '../stores/contacts';
import { useAuthStore } from '../stores/auth';
import type { JiraUser } from '../types/jira';

const contactsStore = useContactsStore();
const authStore = useAuthStore();
const searchQuery = ref('');
const searchResults = ref<JiraUser[]>([]);
const selectedContact = ref<JiraUser | null>(null);

watch(searchQuery, async (newQuery) => {
  if (newQuery && newQuery.length >= 2) {
    searchResults.value = await contactsStore.searchContacts(newQuery);
  } else {
    searchResults.value = [];
  }
});

function selectContact(contact: JiraUser) {
  selectedContact.value = contact;
}

function handleCall() {
  if (selectedContact.value) {
    // TODO: Implement call functionality
    console.log('Calling:', selectedContact.value.displayName);
  }
}
</script>

<style scoped>
.contact-search {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-container {
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  font-size: 0.875rem;
}

.call-button {
  padding: 0.5rem 1rem;
  background-color: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.call-button:disabled {
  background-color: #c1c7d0;
  cursor: not-allowed;
}

.search-results {
  max-height: 300px;
  overflow-y: auto;
}

.loading {
  padding: 1rem;
  text-align: center;
  color: #6b778c;
}

.contact-item {
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-bottom: 1px solid #f4f5f7;
  cursor: pointer;
}

.contact-item:hover {
  background-color: #f4f5f7;
}

.contact-item.selected {
  background-color: #deebff;
}

.contact-name {
  font-weight: 500;
  color: #172b4d;
}

.contact-email {
  font-size: 0.75rem;
  color: #6b778c;
}
</style>