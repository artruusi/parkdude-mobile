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

export interface ParkingSpotEvent {
  type: ParkingSpotEventType;
  id: number;
  // startDate: Date,
  // endDate: Date
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

export enum ParkingSpotEventType {
  PARKING = 'Parking',
  RELEASE = 'Release'
}

export enum Marking {
  SIMPLE = 'simple',
  PERIOD = 'period'
}
