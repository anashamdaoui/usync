import { defineStore } from 'pinia';
import { ref } from 'vue';
import { jiraApi } from '../utils/api';
import { storage } from '../utils/storage';

interface JiraUser {
  accountId: string;
  displayName: string;
  emailAddress: string;
}

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<JiraUser[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchContacts() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const cachedContacts = await storage.get<JiraUser[]>('contacts');
      if (cachedContacts) {
        contacts.value = cachedContacts;
      }

      const response = await jiraApi.get('/users/assignable/search', {
        params: {
          project: 'ICP',
          maxResults: 20
        }
      });
      
      contacts.value = response.data;
      await storage.set('contacts', response.data);
    } catch (err) {
      error.value = 'Failed to fetch contacts';
      console.error('Failed to fetch contacts:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function searchContacts(query: string): Promise<JiraUser[]> {
    if (!contacts.value.length) {
      await fetchContacts();
    }
    return contacts.value.filter(contact => 
      contact.displayName.toLowerCase().includes(query.toLowerCase()) ||
      contact.emailAddress.toLowerCase().includes(query.toLowerCase())
    );
  }

  return {
    contacts,
    isLoading,
    error,
    fetchContacts,
    searchContacts
  };
});