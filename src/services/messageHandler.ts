import { checkJiraAuth } from './auth';
import { MessageTypes } from '../types/messages';

export function handleBackgroundMessages(
  message: MessageTypes,
  sendResponse: (response?: any) => void
): boolean {
  if (message.type === 'CHECK_AUTH') {
    checkJiraAuth().then(sendResponse);
    return true; // Keep the message channel open for async response
  }
  return false;
}