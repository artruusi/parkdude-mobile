import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

// Interfaces for reducers

export interface LoginState {
  isAuthenticated: boolean;
  userRole?: UserRole;
  name?: string;
  loading: true;
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

// Types

export type Dispatch = ThunkDispatch<{}, void, Action>;
