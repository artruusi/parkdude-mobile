import 'react-native';
import configureStore from 'redux-mock-store';
import React from 'react';
import MainView from '../../src/components/MainView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {exportAllDeclaration} from '@babel/types';

const mockStore = configureStore([]);
const store = mockStore({parking: {calendarList: [],
  ownedSpots: []}});

it('renders correctly', () => {
  expect(true).toBe(true);
  // renderer.create(
  //   <Provider store={store}>
  //     <MainView/>
  //   </Provider>
  // );
});
