import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {YOUR_PARKINGS, NO_PARKINGS_TITLE, NO_PARKINGS_TEXT} from '../Constants';
import {connect} from 'react-redux';
import {getMyParkings, simulateGetMyParkings} from '../actions/parkingActions';
import {ParkingSpotEvent} from '../types';
import {Colors} from '../../assets/colors';
import {NavigationScreenProp} from 'react-navigation';

interface Props {
  getMyParkings: () => void;
  simulateGetMyParkings: () => void;
  navigation: NavigationScreenProp<any, any>;
  myParkings: ParkingSpotEvent[];
}

interface ItemProps extends ParkingSpotEvent {
  key: number;
}

class ParkingItem extends Component<ItemProps> {
  render() {
    return (
      <View style={styles.item}>
        <Text style={{fontWeight: 'bold'}}>{this.props.type}</Text>
        <Text>Spot: {this.props.id}</Text>
      </View>
    );
  }
}

class MyParkingsView extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.simulate = this.simulate.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'My parkings'
  };

  componentDidMount() {
    this.props.getMyParkings();
  }

  simulate() {
    this.props.simulateGetMyParkings();
  }

  render() {
    const parkings = this.props.myParkings.map((parking: ParkingSpotEvent, keyIndex: number) => (
      <ParkingItem
        key={keyIndex}
        type={parking.type}
        id={parking.id}
      />
    ));

    if (this.props.myParkings.length > 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{YOUR_PARKINGS}</Text>
          {parkings}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={require('../../assets/icons/ic-parking/drawable-hdpi/ic_parking.png')}/>
          <Text style={styles.emptyTitle}>{NO_PARKINGS_TITLE}</Text>
          <Text style={styles.text}>{NO_PARKINGS_TEXT}</Text>
          <TouchableOpacity style={styles.simbutton} onPress={this.simulate}>
            <Text>Simulate getting parkings</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  myParkings: state.parking
});

const mapDispatchToProps = {getMyParkings, simulateGetMyParkings};

export default connect(mapStateToProps, mapDispatchToProps)(MyParkingsView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: 229,
    height: 42,
    // fontFamily: 'Exo2',
    fontSize: 34.8,
    fontWeight: 'bold',
    fontStyle: 'normal',
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
    // fontFamily: "Exo2",
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#c8c8c8'
  },
  text: {
    // fontFamily: "Exo2",
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#c8c8c8'
  },
  item: {
    width: 327.8,
    height: 133.9,
    borderRadius: 12.2,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
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
  }
});
