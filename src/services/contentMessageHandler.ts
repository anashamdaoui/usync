import { MessageTypes, PhoneStateMessage } from '../types/messages';

export function handleContentMessages(message: MessageTypes): void {
  if (message.type === 'PHONE_STATE_UPDATE') {
    const phoneStateMessage = message as PhoneStateMessage;
    console.log('Phone state updated:', phoneStateMessage.payload.state);
  }
}