let ws: WebSocket | null = null;

export function initializeWebSocket() {
  ws = new WebSocket('wss://api.ggphone.com/v1/ws');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'phoneState') {
      chrome.runtime.sendMessage({
        type: 'PHONE_STATE_UPDATE',
        payload: data.state
      });
    }
  };

  ws.onclose = () => {
    setTimeout(initializeWebSocket, 5000);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
    ws?.close();
  };
}

export function sendWebSocketMessage(message: any) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}