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

export interface BasicParkingSpotData {
  id: string;
  name: string;
}

export interface ParkingSpotEvent {
  type: ParkingSpotEventType;
  id: number;
}

export interface CalendarReservations {
  calendar: CalendarEntry[];
  ownedSpots: BasicParkingSpotData[];
}

export interface CalendarEntry {
  date: string;
  spacesReservedByUser: BasicParkingSpotData[];
  availableSpaces: number;
}

export interface CalendarDateObject {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
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

