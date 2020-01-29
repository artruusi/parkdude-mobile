import {RESERVE_SPOTS} from './actionTypes';
import {POST_RESERVATION_URL, DELETE_SPOTS_URL} from 'react-native-dotenv';
import {gotNetworkError, reservationFailed, clearErrorState,
  generalError, deleteReservationFailed, gotNotFoundError, deleteReleaseFailed} from './errorActions';
import {CONNECTION_ERROR, GENERAL_ERROR_MESSAGE, ENTITY_NOT_FOUND} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod, PostReservation, UserParkingItem, LoadingType, NewRelease} from '../types';
import {getMyParkings} from './parkingActions';
import {setLoadingState, removeLoadingState} from './loadingActions';
import {verifiedUser} from './authActions';

export const postReservation = (reservation: PostReservation) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.RESERVE_SPOTS));
      const response = await apiFetch(
        POST_RESERVATION_URL,
        {method: HttpMethod.POST,
          body: JSON.stringify(reservation),
          headers: {'Content-Type': 'application/json'}
        });
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        if (response.status === 200) {
          dispatch(clearErrorState());
          dispatch(createPostReservationAction(result));
          dispatch(removeLoadingState(LoadingType.RESERVE_SPOTS));
          await getMyParkings()(dispatch);
          return;
        } else if (response.status === 400) {
          dispatch(reservationFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(ENTITY_NOT_FOUND));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(generalError(GENERAL_ERROR_MESSAGE));
        }
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.RESERVE_SPOTS));
  };
};

export const createPostReservationAction = (result) => {
  return {
    type: RESERVE_SPOTS,
    payload: result
  };
};

export const deleteReservation = (item: UserParkingItem) => {
  return async (dispatch) => {
    dispatch(setLoadingState(LoadingType.DELETE_RESERVATION));
    try {
      const date = item.parkingEvent.date;
      const id = item.parkingEvent.parkingSpot.id;
      const response = await apiFetch(
        `${DELETE_SPOTS_URL}/${id}?dates=${date}`,
        {method: HttpMethod.DELETE}
      );
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        if (response.status === 200) {
          dispatch(clearErrorState());
          await getMyParkings()(dispatch);
        } else if (response.status === 400) {
          dispatch(deleteReservationFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(ENTITY_NOT_FOUND));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(generalError(GENERAL_ERROR_MESSAGE));
        }
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.DELETE_RESERVATION));
  };
};

export const postRelease = (item: NewRelease) => {
  return async (dispatch) => {
    dispatch(setLoadingState(LoadingType.DELETE_RESERVATION));
    try {
      const id = item.parkingSpotId;
      const response = await apiFetch(
        `${DELETE_SPOTS_URL}/${id}?dates=${item.dates.join(',')}`,
        {method: HttpMethod.DELETE}
      );
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        if (response.status === 200) {
          dispatch(clearErrorState());
          await getMyParkings()(dispatch);
        } else if (response.status === 400) {
          dispatch(deleteReservationFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(ENTITY_NOT_FOUND));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(generalError(GENERAL_ERROR_MESSAGE));
        }
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.DELETE_RESERVATION));
  };
};

export const deleteRelease = (release: PostReservation) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.DELETE_RELEASE));
      const response = await apiFetch(
        POST_RESERVATION_URL,
        {method: HttpMethod.POST,
          body: JSON.stringify(release),
          headers: {'Content-Type': 'application/json'}
        });
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        if (response.status === 200) {
          dispatch(clearErrorState());
          dispatch(createPostReservationAction(result));
          dispatch(removeLoadingState(LoadingType.DELETE_RELEASE));
          await getMyParkings()(dispatch);
          return;
        } else if (response.status === 400) {
          dispatch(deleteReleaseFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(ENTITY_NOT_FOUND));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(generalError(GENERAL_ERROR_MESSAGE));
        }
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.DELETE_RELEASE));
  };
};
