export interface JiraUser {
  accountId: string;
  displayName: string;
  emailAddress: string;
  avatarUrl?: string;
}

export interface JiraAuthState {
  isAuthenticated: boolean;
  currentUser: JiraUser | null;
  error: string | null;
}