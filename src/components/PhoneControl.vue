<script setup lang="ts">
import { ref } from 'vue';
import { usePhoneStore } from '../stores/phone';

const phoneStore = usePhoneStore();
const number = ref('');

const handleCall = async () => {
  if (number.value) {
    await phoneStore.makeCall(number.value);
  }
};
</script>

<template>
  <div class="phone-control">
    <div class="input-group">
      <input 
        v-model="number"
        type="tel"
        placeholder="Enter phone number"
        class="phone-input"
      />
      <button 
        @click="handleCall"
        :disabled="phoneStore.phoneState !== 'idle'"
        class="call-button"
      >
        Call
      </button>
    </div>
    
    <div v-if="phoneStore.currentCall" class="call-status">
      <p>Call Status: {{ phoneStore.phoneState }}</p>
      <div class="call-actions">
        <button class="action-button">Hold</button>
        <button class="action-button danger">Hang Up</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone-control {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.phone-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.call-button {
  padding: 0.5rem 1rem;
  background: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.call-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.call-status {
  padding: 1rem;
  background: #f4f5f7;
  border-radius: 4px;
}

.call-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.action-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #0052cc;
  color: white;
}

.action-button.danger {
  background: #de350b;
}
</style>