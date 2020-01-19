// Interfaces for reducers

export interface LoginState {
  isAuthenticated: boolean;
  userRole?: UserRole;
  name?: string;
  loading: boolean;
}

export interface ErrorState{
  generalError: string;
  networkError: string;
  postReservationError: ReservationFailed;
  passwordLoginError: string;
  signupError: string;
  deleteReservationError: ReservationFailed;
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
  reservation?: Record<string, any>;
}

export interface UserParkingItem {
  parkingEvent: ParkingEvent;
  type: ParkingSpotEventType;
}

export interface NewRelease {
  dates: string[];
  parkingSpotId: string;
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
  parkingSpotId?: string;
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

export enum LoadingType {
  SIGNUP = 'signUpLoading',
  PASSWORD_LOGIN = 'passwordLoginLoading',
  GET_MONTH = 'getMonthLoading',
  GET_RESERVATIONS = 'getReservationsLoading',
  GET_PARKING_SPOTS = 'getParkingSpotsLoading',
  RESERVE_SPOTS = 'reserveSpotsLoading',
  DELETE_RESERVATION = 'deleteReservationLoading'
}

export enum CalendarType {
  RESERVATION = 'reservation',
  RELEASE = 'release'
}

export type LoadingState = {
  [key in LoadingType]: boolean;
}

