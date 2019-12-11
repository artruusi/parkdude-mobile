import {RESERVE_SPOTS} from './actionTypes';
import {POST_RESERVATION_URL} from 'react-native-dotenv';
import {gotNetworkError, reservationFailed, clearErrorState, generalError} from './errorActions';
import {CONNECTION_ERROR, GENERAL_ERROR_MESSAGE} from '../Constants';
import {apiFetch} from '../Utils';
import {HttpMethod, PostReservation} from '../types';


export const postReservation = (reservation: PostReservation) => {
  return async (dispatch) => {
    try {
      // console.log(reservation);
      const postReservationResponse = await apiFetch(
        POST_RESERVATION_URL,
        {method: HttpMethod.POST,
          body: JSON.stringify(reservation),
          headers: {'Content-Type': 'application/json'}
        });
      const result = await postReservationResponse.json();
      //console.log(postReservationResponse.status);
      //console.log(result);
      if (postReservationResponse.status === 200) {
        dispatch(clearErrorState());
        dispatch(createPostReservationAction(result));
      }
      if (postReservationResponse.status === 400) {
        dispatch(reservationFailed(result));
      } else {
        // HTTP Status 500 or something else unexpected
        dispatch(generalError(GENERAL_ERROR_MESSAGE));
      }
    } catch (error) {
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

