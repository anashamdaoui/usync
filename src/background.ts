import { initializeWebSocket } from './services/websocket';
import { checkJiraAuth } from './services/auth';
import { handleBackgroundMessages } from './services/messageHandler';
import { MessageTypes } from './types/messages';

// Initialize background tasks
initializeWebSocket();

// Check Jira auth status every 5 minutes
setInterval(checkJiraAuth, 5 * 60 * 1000);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((
  message: MessageTypes,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => {
  return handleBackgroundMessages(message, sendResponse);
});