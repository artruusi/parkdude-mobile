// Interfaces for reducers

export interface LoginState {
  isAuthenticated: boolean;
  userRole?: UserRole;
  name?: string;
  loading: boolean;
}

export interface ErrorState{
  hasErrors: boolean;
  error: string;
}

// Enums

export enum UserRole {
  ADMIN = 'admin',
  UNVERIFIED = 'unverified',
  VERIFIED = 'verified',
  SLACK = 'slack'
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
