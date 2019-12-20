import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {YOUR_PARKINGS, NO_PARKINGS_TITLE, NO_PARKINGS_TEXT, PERMANENT_SPOT, NEW_RELEASE} from '../Constants';
import {connect} from 'react-redux';
import {getMyParkings} from '../actions/parkingActions';
import {MyReservations, ParkingEvent, ParkingSpotEventType, BasicParkingSpotData} from '../types';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp, ScrollView} from 'react-navigation';
import {prettierDateOutput} from '../Utils';

interface Props {
  getMyParkings: () => void;
  navigation: NavigationScreenProp<any, any>;
  myReservations: MyReservations;
}

interface ItemProps extends ParkingEvent {
  key: number;
  color: Colors;
  type: ParkingSpotEventType;
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
              <Text style={{fontFamily: 'Exo2-bold'}}>{this.props.parkingSpot.name}</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <Text style={{fontFamily: 'Exo2-bold'}}>Spot</Text>
          </View>
        </View>
        <View style={styles.column2}>
          <Text style={{fontFamily: 'Exo2-bold'}}>{this.props.type}</Text>
          <Text style={{fontFamily: 'Exo2-bold'}}>{prettierDateOutput(this.props.date)}</Text>
        </View>
        <View style={styles.column3}>
          <View style={styles.row3}>
            <Image source={require('../../assets/icons/ic-delete/drawable-hdpi/ic_delete.png')}/>
          </View>
          <View style={styles.row4}>
            <Image source={require('../../assets/icons/ic-edit/drawable-hdpi/ic_edit.png')}/>
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
        <TouchableOpacity style={styles.releaseButton} onPress={null}>
          <Text style={{fontFamily: 'Exo2-bold', fontSize: 18}}>{NEW_RELEASE}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class MyParkingsView extends Component<Props> {
  constructor(props: Props) {
    super(props);
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
        date={reservation.date}
        parkingSpot={reservation.parkingSpot}
        type={ParkingSpotEventType.PARKING}
      />
    ));

    const releases = this.props.myReservations.releases.map((release: ParkingEvent, keyIndex: number) => (
      <ParkingItem
        key={keyIndex}
        color={Colors.RED}
        date={release.date}
        parkingSpot={release.parkingSpot}
        type={ParkingSpotEventType.RELEASE}
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
        </SafeAreaView>
      );
    } else {
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

const mapStateToProps = (state) => ({
  myReservations: state.myReservations
});

const mapDispatchToProps = {getMyParkings};

export default connect(mapStateToProps, mapDispatchToProps)(MyParkingsView);

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
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 20,
    margin: 10
  },
  permanentSpotContainer: {
    height: '25%', // TODO this does not work
    flex: 1,
    backgroundColor: '#ffffff',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
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
    color: '#000000'
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
  }
});
