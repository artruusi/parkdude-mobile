import {RESERVE_SPOTS} from './actionTypes';
import {POST_RESERVATION_URL} from 'react-native-dotenv';
import {gotNetworkError, reservationFailed, clearErrorState} from './errorActions';
import {CONNECTION_ERROR} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod, PostReservation} from '../types';


export const postReservation = (reservation: PostReservation) => {
  return async (dispatch) => {
    try {
      // This is just for testing the error message
      const day = '2019-12-24';
      if (day in reservation.dates) {
        dispatch(reservationFailed({
          message: 'Reservation failed. There weren\'t available spots for some of the days.',
          errorDates: ['2019-12-24']
        }));
      } else {
        const postReservationResponse = await apiFetch(POST_RESERVATION_URL, {method: HttpMethod.POST});
        if (postReservationResponse.status === 400) {
          const result = await postReservationResponse.json();
          dispatch(reservationFailed(result));
        } else {
          const result = await postReservationResponse.json();
          dispatch(clearErrorState());
          dispatch(createPostReservationAction(result));
        }
      }
    } catch (error) {
      dispatch(clearErrorState()); // Delete this line when simulation is no longer needed
      dispatch(gotNetworkError(CONNECTION_ERROR));
    }
  };
};

export const createPostReservationAction = (result) => {
  return {
    type: RESERVE_SPOTS,
    payload: result
  };
};

