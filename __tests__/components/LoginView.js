import 'react-native';
import configureStore from 'redux-mock-store';
import React from 'react';
import LoginView from '../../src/components/LoginView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);
const store = mockStore({auth: {isAuthenticated: false}});

describe('LoginView tests', () => {
  it('renders correctly', () => {
    renderer.create(
      <Provider store={store}>
        <LoginView />
      </Provider>
    );
  });
});
