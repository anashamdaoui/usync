let ws: WebSocket | null = null;

// Initialize WebSocket connection
function initializeWebSocket() {
  ws = new WebSocket('wss://api.ggphone.com/v1/ws');
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // Handle phone state updates
    if (data.type === 'phoneState') {
      chrome.runtime.sendMessage({
        type: 'PHONE_STATE_UPDATE',
        payload: data.state
      });
    }
  };

  ws.onclose = () => {
    // Attempt to reconnect after 5 seconds
    setTimeout(initializeWebSocket, 5000);
  };
}

// Check Jira authentication status periodically
async function checkJiraAuth() {
  try {
    const response = await fetch('https://enreach-services.atlassian.net/rest/api/3/myself', {
      credentials: 'include'
    });
    
    chrome.runtime.sendMessage({
      type: 'JIRA_AUTH_STATUS',
      payload: response.ok
    });
  } catch (error) {
    console.error('Error checking Jira auth:', error);
  }
}

// Initialize background tasks
initializeWebSocket();
setInterval(checkJiraAuth, 5 * 60 * 1000); // Check every 5 minutes