import 'react-native';
import configureStore from 'redux-mock-store';
import React from 'react';
import WaitForConfirmationView from '../../src/components/WaitForConfirmationView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {UserRole} from '../../src/types';

const mockStore = configureStore([]);
const store = mockStore({
  auth: {
    isAuthenticated: true,
    userRole: UserRole.VERIFIED
  }
});

describe('WaitForConfirmationView tests', () => {
  it('renders correctly', () => {
    renderer.create(
      <Provider store={store}>
        <WaitForConfirmationView />
      </Provider>
    );
  });
});
