import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {YOUR_PARKINGS, NO_PARKINGS_TITLE, NO_PARKINGS_TEXT, PERMANENT_SPOT,
  NEW_RELEASE, SPOT, ARE_YOU_SURE, DATE, DELETE_RELEASE,
  DELETE, DELETE_PARKING, CANCEL, DELETE_FAILED, GENERAL_ERROR_MESSAGE, CONNECTION_ERROR} from '../Constants';
import {connect, ConnectedProps} from 'react-redux';
import {getMyParkings} from '../actions/parkingActions';
import {postReservation, deleteReservation} from '../actions/reservationActions';
import {ParkingEvent, ParkingSpotEventType, BasicParkingSpotData,
  UserParkingItem} from '../types';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {prettierDateOutput} from '../Utils';
import Modal from 'react-native-modal';
import {RootReducer} from '../reducers';
import {RoundedButton} from '../shared/RoundedButton';
import {ErrorModal} from '../shared/ErrorModal';
import {LoadingArea} from '../shared/LoadingArea';

type Props = ConnectedProps<typeof connector> & {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  deleteModalVisible: boolean;
  errorModalVisible: boolean;
  parkingItemToDelete: UserParkingItem;
  errorText: string;
}

interface ItemProps {
  key: number;
  color: Colors;
  item: UserParkingItem;
  initDeleteModal: (UserParkingItem) => void;
}

interface PermanentSpotProps extends BasicParkingSpotData {
  key: number;
}

class ParkingItem extends Component<ItemProps> {
  render() {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.column1}>
          <View style={styles.row1}>
            <View style={{...styles.spotCircle, backgroundColor: this.props.color}}>
              <Text style={{fontFamily: 'Exo2-bold'}}>{this.props.item.parkingEvent.parkingSpot.name}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={{fontFamily: 'Exo2-bold'}}>Spot</Text>
          </View>
        </View>
        <View style={styles.column2}>
          <Text style={{fontFamily: 'Exo2-bold', fontSize: 20}}>{this.props.item.type}</Text>
          <Text style={{fontFamily: 'Exo2-bold', fontSize: 16}}>
            {prettierDateOutput(this.props.item.parkingEvent.date)}
          </Text>
        </View>
        <View style={styles.column3}>
          <View style={styles.row3}>
            <TouchableOpacity
              onPress={() => {
                this.props.initDeleteModal(this.props.item);
              }}
            >
              <Image source={require('../../assets/icons/ic-delete/drawable-hdpi/ic_delete.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

class PermanentSpotItem extends Component<PermanentSpotProps> {
  render() {
    return (
      <View style={styles.permanentSpotContainer}>
        <Text style={{fontFamily: 'Exo2-bold', fontSize: 25}}>{PERMANENT_SPOT}</Text>
        <Text style={{fontFamily: 'Exo2-bold', fontSize: 25}}>{this.props.name}</Text>
        <RoundedButton
          onPress={/* TODO */ null}
          buttonText={NEW_RELEASE}
          buttonStyle={styles.releaseButton}
        />
      </View>
    );
  }
}

class MyParkingsView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      deleteModalVisible: false,
      errorModalVisible: false,
      parkingItemToDelete: {
        parkingEvent: {
          date: '',
          parkingSpot: {id: '', name: ''}
        },
        type: ParkingSpotEventType.PARKING
      },
      errorText: ''
    };
    this.initDeleteModal = this.initDeleteModal.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    this.toggleErrorModal = this.toggleErrorModal.bind(this);
    this.delete = this.delete.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'My parkings'
  };

  componentDidMount() {
    this.props.getMyParkings();
    this.props.navigation.addListener('willFocus', () => {
      this.props.getMyParkings();
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.error.deleteReservationError.message !== this.props.error.deleteReservationError.message) {
      if (this.props.error.deleteReservationError.message !== '') {
        this.setState({errorText: DELETE_FAILED});
      }
    }
    if (prevProps.error.generalError !== this.props.error.generalError) {
      if (this.props.error.generalError !== '') {
        this.setState({errorText: GENERAL_ERROR_MESSAGE});
      }
    }
    if (prevProps.error.networkError !== this.props.error.networkError) {
      if (this.props.error.networkError !== '') {
        this.setState({errorText: CONNECTION_ERROR});
      }
    }
  }

  initDeleteModal(item: UserParkingItem) {
    this.setState({parkingItemToDelete: item});
    this.toggleDeleteModal();
  }

  toggleDeleteModal() {
    this.setState({deleteModalVisible: !this.state.deleteModalVisible});
  }

  toggleErrorModal() {
    this.setState({errorModalVisible: !this.state.errorModalVisible, errorText: ''});
  }

  async delete() {
    if (this.state.parkingItemToDelete.type === ParkingSpotEventType.PARKING) {
      await this.props.deleteReservation(this.state.parkingItemToDelete);
    }
    if (this.state.parkingItemToDelete.type === ParkingSpotEventType.RELEASE) {
      const date = this.state.parkingItemToDelete.parkingEvent.date;
      const reservation = {
        dates: [date],
        parkingSpotId: this.state.parkingItemToDelete.parkingEvent.parkingSpot.id
      };
      await this.props.postReservation(reservation);
    }
    this.toggleDeleteModal();
  }

  render() {
    const ownedSpots = this.props.myReservations.ownedSpots.map((spot: BasicParkingSpotData, keyIndex: number) => (
      <PermanentSpotItem
        key={keyIndex}
        id={spot.id}
        name={spot.name}
      />
    ));

    const reservations = this.props.myReservations.reservations.map((reservation: ParkingEvent, keyIndex: number) => (
      <ParkingItem
        key={keyIndex}
        color={Colors.GREEN}
        item={{
          parkingEvent: {
            date: reservation.date,
            parkingSpot: reservation.parkingSpot
          },
          type: ParkingSpotEventType.PARKING}}
        initDeleteModal={this.initDeleteModal}
      />
    ));

    const releases = this.props.myReservations.releases.map((release: ParkingEvent, keyIndex: number) => (
      <ParkingItem
        key={keyIndex}
        color={Colors.RED}
        item={{
          parkingEvent: {
            date: release.date,
            parkingSpot: release.parkingSpot
          },
          type: ParkingSpotEventType.RELEASE}}
        initDeleteModal={this.initDeleteModal}
      />
    ));

    if (this.props.myReservations.reservations.length > 0 ||
      this.props.myReservations.releases.length > 0 ||
      this.props.myReservations.ownedSpots.length > 0) {
      return (

        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.title}>{YOUR_PARKINGS}</Text>
            </View>
            {ownedSpots}
            {reservations}
            {releases}
          </ScrollView>

          {/* Delete reservation/release modal */}

          <Modal
            isVisible={this.state.deleteModalVisible}
            onBackdropPress={this.toggleDeleteModal}
            onBackButtonPress={this.toggleDeleteModal}
            animationInTiming={500}
            animationOutTiming={100}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}>
            <View style={styles.modal}>
              <View style={{margin: 30}}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>{ARE_YOU_SURE}</Text>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {this.state.parkingItemToDelete.type === ParkingSpotEventType.PARKING ?
                    DELETE_PARKING : DELETE_RELEASE}
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {SPOT}: {this.state.parkingItemToDelete.parkingEvent.parkingSpot.name}
                </Text>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {DATE}: {prettierDateOutput(this.state.parkingItemToDelete.parkingEvent.date)}
                </Text>
              </View>
              <RoundedButton
                onPress={this.delete}
                buttonText={DELETE}
                isLoading={this.props.deleteReservationLoading || this.props.removeReleaseLoading}
                buttonStyle={{...styles.modalButton, backgroundColor: Colors.RED}}
              />
              <RoundedButton
                onPress={this.toggleDeleteModal}
                buttonText={CANCEL}
                disabled={this.props.deleteReservationLoading || this.props.removeReleaseLoading}
                buttonStyle={{...styles.modalButton, backgroundColor: Colors.WHITE}}
              />
            </View>
          </Modal>

          {/* Error modal */}

          <ErrorModal
            toggleErrorModal={this.toggleErrorModal}
            isVisible={this.state.errorText !== ''}
            errorText={this.state.errorText}
          />

        </SafeAreaView>

      );
    } else {
      if (this.props.reservationsLoading) {
        return <LoadingArea/>;
      }
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={require('../../assets/icons/ic-parking/drawable-hdpi/ic_parking.png')}/>
          <Text style={styles.emptyTitle}>{NO_PARKINGS_TITLE}</Text>
          <Text style={styles.text}>{NO_PARKINGS_TEXT}</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = (state: RootReducer) => ({
  myReservations: state.myReservations,
  error: state.error,
  reservationsLoading: state.loading.getReservationsLoading,
  deleteReservationLoading: state.loading.deleteReservationLoading,
  removeReleaseLoading: state.loading.reserveSpotsLoading
});

const mapDispatchToProps = {getMyParkings, deleteReservation, postReservation};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MyParkingsView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    height: '25%', // TODO this does not work
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderRadius: 12.2,
    shadowColor: Colors.BLACK,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    margin: 10
  },
  permanentSpotContainer: {
    height: '25%', // TODO this does not work
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingTop: 20,
    marginTop: 10
  },
  title: {
    width: 229,
    height: 42,
    fontFamily: 'Exo2-bold',
    fontSize: 34.8,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.BLACK
  },
  image: {
    width: 105,
    height: 105,
    opacity: 0.2
  },
  emptyTitle: {
    width: 114,
    height: 24,
    fontFamily: 'Exo2-bold',
    fontSize: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#c8c8c8'
  },
  text: {
    fontFamily: 'Exo2',
    fontSize: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#c8c8c8'
  },
  column1: {
    width: '20%',
  },
  column2: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  column3: {
    width: '10%',
  },
  row1: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row2: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row3: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row4: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spotCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simbutton: {
    width: 327,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  releaseButton: {
    width: 327,
    height: 43,
    borderRadius: 21.7,
    backgroundColor: Colors.RED,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  modalButton: {
    width: 250,
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.APP_BACKGROUND,
    borderRadius: 21.7,
    margin: 20
  }
});
