import {RESERVE_SPOTS} from './actionTypes';
import {POST_RESERVATION_URL, DELETE_SPOTS_URL} from 'react-native-dotenv';
import {gotNetworkError, reservationFailed, clearErrorState,
  generalError, deleteReservationFailed} from './errorActions';
import {CONNECTION_ERROR, GENERAL_ERROR_MESSAGE} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod, PostReservation, UserParkingItem, LoadingType} from '../types';
import {getMyParkings} from './parkingActions';
import {setLoadingState, removeLoadingState} from './loadingActions';

export const postReservation = (reservation: PostReservation) => {
  return async (dispatch) => {
    try {
      dispatch(setLoadingState(LoadingType.RESERVE_SPOTS));
      const postReservationResponse = await apiFetch(
        POST_RESERVATION_URL,
        {method: HttpMethod.POST,
          body: JSON.stringify(reservation),
          headers: {'Content-Type': 'application/json'}
        });
      const result = await postReservationResponse.json();
      if (postReservationResponse.status === 200) {
        dispatch(clearErrorState());
        dispatch(createPostReservationAction(result));
      } else if (postReservationResponse.status === 400) {
        dispatch(reservationFailed(result));
      } else {
        // HTTP Status 500 or something else unexpected
        dispatch(generalError(GENERAL_ERROR_MESSAGE));
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
      const date = item.parkingEvent.date;
      const id = item.parkingEvent.parkingSpot.id;
      const response = await apiFetch(
        `${DELETE_SPOTS_URL}/${id}?dates=${date}`,
        {method: HttpMethod.DELETE}
      );
      const result = await response.json();
      if (response.status === 200) {
        dispatch(clearErrorState());
        getMyParkings()(dispatch);
      } else if (response.status === 400) {
        dispatch(deleteReservationFailed(result));
      } else {
        // HTTP Status 500 or something else unexpected
        dispatch(generalError(GENERAL_ERROR_MESSAGE));
      }
    } catch (error) {
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

