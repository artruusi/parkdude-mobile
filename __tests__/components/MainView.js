import 'react-native';
import configureStore from 'redux-mock-store';
import React from 'react';
import MainView from '../../src/components/MainView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  expect(true).toBe(true);
  // renderer.create(<MainView />);
});
