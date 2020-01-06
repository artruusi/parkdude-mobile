import 'react-native';
import configureStore from 'redux-mock-store';
import React from 'react';
import PasswordLoginView from '../../src/components/PasswordLoginView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {UserRole} from '../../src/types';

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    isAuthenticated: false,
    userRole: UserRole.UNVERIFIED,
  },
  error: {
    passwordLoginError: ''
  }
});

describe('PasswordLoginView tests', () => {
  it('renders correctly', () => {
    renderer.create(
      <Provider store={store}>
        <PasswordLoginView />
      </Provider>
    );
  });
});
