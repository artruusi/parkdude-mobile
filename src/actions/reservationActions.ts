import {RESERVE_SPOTS} from './actionTypes';
import {POST_RESERVATION_URL, DELETE_SPOTS_URL} from 'react-native-dotenv';
import {gotNetworkError, reservationFailed, clearErrorState,
  deleteReservationFailed, gotNotFoundError, deleteReleaseFailed, releaseFailed} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod, PostReservation, UserParkingItem, LoadingType, NewRelease} from '../types';
import {getMyParkings} from './parkingActions';
import {setLoadingState, removeLoadingState} from './loadingActions';
import {verifiedUser} from './authActions';

export const postReservation = (reservation: PostReservation) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrorState());
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
          dispatch(createPostReservationAction(result));
          dispatch(removeLoadingState(LoadingType.RESERVE_SPOTS));
          return;
        } else if (response.status === 400) {
          dispatch(reservationFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(result.message));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(reservationFailed(result));
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
    try {
      dispatch(clearErrorState());
      dispatch(setLoadingState(LoadingType.DELETE_RESERVATION));
      const date = item.parkingEvent.date;
      const id = item.parkingEvent.parkingSpot.id;
      const response = await apiFetch(
        `${DELETE_SPOTS_URL}/${id}?dates=${date}`,
        {method: HttpMethod.DELETE}
      );
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        if (response.status === 200) {
          await getMyParkings()(dispatch);
        } else if (response.status === 400) {
          dispatch(deleteReservationFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(result.message));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(deleteReservationFailed(result));
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
    try {
      dispatch(clearErrorState());
      dispatch(setLoadingState(LoadingType.NEW_RELEASE));
      const id = item.parkingSpotId;
      const response = await apiFetch(
        `${DELETE_SPOTS_URL}/${id}?dates=${item.dates.join(',')}`,
        {method: HttpMethod.DELETE}
      );
      if (await verifiedUser(response.status, dispatch)) {
        const result = await response.json();
        if (response.status === 200) {
          await getMyParkings()(dispatch);
        } else if (response.status === 400) {
          dispatch(releaseFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(result.message));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(releaseFailed(result));
        }
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.NEW_RELEASE));
  };
};

export const deleteRelease = (release: PostReservation) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrorState());
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
          dispatch(createPostReservationAction(result));
          dispatch(removeLoadingState(LoadingType.DELETE_RELEASE));
          getMyParkings()(dispatch);
          return;
        } else if (response.status === 400) {
          dispatch(deleteReleaseFailed(result));
        } else if (response.status === 404) {
          dispatch(gotNotFoundError(result.message));
        } else {
          // HTTP Status 500 or something else unexpected
          dispatch(deleteReleaseFailed(result));
        }
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
    dispatch(removeLoadingState(LoadingType.DELETE_RELEASE));
  };
};
