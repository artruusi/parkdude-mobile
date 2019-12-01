// Interfaces for reducers

export interface LoginState {
  isAuthenticated: boolean;
  userRole?: UserRole;
  name?: string;
  loading: boolean;
}

export interface ErrorState{
  networkError: string;
  postReservationError: ReservationFailed;
}

export interface ReservationFailed{
  message: string;
  dates: string[];
}

export interface BasicParkingSpotData {
  id: string;
  name: string;
}

export interface MyReservations {
  ownedSpots: BasicParkingSpotData[];
  reservations: ParkingEvent[];
  releases: ParkingEvent[];
}

export interface ParkingEvent {
  date: string;
  parkingSpot: BasicParkingSpotData;
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

export interface PostReservation {
  dates: string[];
  userId: string;
  parkingSpotId: string;
}

export interface SuccesfulReservation {
  reservations: ReservationsResponse[];
  message: string;
}

export interface ReservationsResponse {
  date: string;
  parkingSpot: BasicParkingSpotData;
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

