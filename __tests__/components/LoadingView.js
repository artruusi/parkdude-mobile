import 'react-native';
import configureStore from 'redux-mock-store';
import React from 'react';
import LoadingView from '../../src/components/LoadingView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';

const mockStore = configureStore([]);
const store = mockStore({error: {networkError: ''}});

describe('LoadingView tests', () => {
  it('renders correctly', () => {
    renderer.create(
      <Provider store={store}>
        <LoadingView />
      </Provider>
    );
  });
});
