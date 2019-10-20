import 'react-native';
import React from 'react';
import LoginView from '../src/components/LoginView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<LoginView />);
});
