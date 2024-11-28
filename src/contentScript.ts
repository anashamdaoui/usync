import { handleContentMessages } from './services/contentMessageHandler';
import { MessageTypes } from './types/messages';

// Content script for injecting into Jira pages
console.log('USync content script loaded');

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((
  message: MessageTypes,
  _sender: chrome.runtime.MessageSender,
  _sendResponse: (response?: any) => void
) => {
  handleContentMessages(message);
});