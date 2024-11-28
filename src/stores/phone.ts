import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePhoneStore = defineStore('phone', () => {
  const currentCall = ref(null);
  const phoneState = ref('idle');
  const sipId = ref('');

  async function makeCall(number: string) {
    try {
      const response = await fetch(`https://api.ggphone.com/v1/phones/${sipId.value}/call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
        },
        body: JSON.stringify({ remoteNumber: number })
      });
      
      if (response.ok) {
        const data = await response.json();
        currentCall.value = data;
        phoneState.value = 'ringback';
      }
    } catch (error) {
      console.error('Error making call:', error);
    }
  }

  async function getToken(): Promise<string> {
    // Implement token retrieval logic
    return '';
  }

  return {
    currentCall,
    phoneState,
    sipId,
    makeCall
  };
});