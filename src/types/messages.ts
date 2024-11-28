export interface ChromeMessage {
  type: string;
  payload?: any;
}

export interface AuthMessage extends ChromeMessage {
  type: 'CHECK_AUTH';
}

export interface PhoneStateMessage extends ChromeMessage {
  type: 'PHONE_STATE_UPDATE';
  payload: {
    state: 'ringing' | 'talking' | 'held' | 'idle' | 'ringback';
  };
}

export type MessageTypes = AuthMessage | PhoneStateMessage;