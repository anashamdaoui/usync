export async function checkJiraAuth(): Promise<boolean> {
  try {
    const response = await fetch('https://enreach-services.atlassian.net/rest/api/3/myself', {
      credentials: 'include'
    });
    
    if (response.ok) {
      const userData = await response.json();
      chrome.storage.local.set({ currentUser: userData });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking Jira auth:', error);
    return false;
  }
}

export function redirectToJiraLogin() {
  chrome.tabs.create({
    url: 'https://enreach-services.atlassian.net/login'
  });
}